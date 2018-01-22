import {HTMLRDFaExporter} from "../../htmlrdfa-exporter"
import {setBlockType, wrapIn, toggleMark,selectParentNode} from "prosemirror-commands"
import {TextSelection} from "prosemirror-state"


export class EditorHTMLRDFa {
    constructor(editor) {
        this.editor = editor
    }

    init() {
        let exportMenu = this.editor.menu.headerbarModel.content.find(menu => menu.id === 'export')

        exportMenu.content.push(
            {
                title: gettext('HTML+RDFa'),
                type: 'action',
                tooltip: gettext('Export the document to a HTML+RDFa file. It can be imported by dokieli'),
                action: editor => {
                    new HTMLRDFaExporter(
                        this.editor.getDoc(),
                        this.editor.mod.db.bibDB,
                        this.editor.mod.db.imageDB,
                        this.editor.mod.styles.citationStyles,
                        this.editor.mod.styles.citationLocales
                    )
                }
            }
        )


        let toolbarModel = this.editor.menu.toolbarModel

        toolbarModel.content.push(
            {
                type: 'button',
                title: gettext('RDF'),
                text: 'RDF',
                action: editor => {
                    let dialog = new AnnotationDialog(editor)
                    dialog.init()
                    // let mark = editor.currentView.state.schema.marks['rdf_property']
                    // let command = toggleMark(mark, {annotation: 1, annotationType: "property"})
                    // command(editor.currentView.state, tr => editor.currentView.dispatch(tr))
                },
                disabled: editor => {
                    if (
                        editor.currentView.state.selection.jsonID === 'gapcursor'
                    ) {
                        return true
                    } else if (
                        editor.currentView.state.selection.$anchor.node(2) &&
                        editor.currentView.state.selection.$anchor.node(2) === editor.currentView.state.selection.$head.node(2)
                    ) {
                        return false
                    } else {
                        return true
                    }
                },
                selected: editor => {
                    let storedMarks = editor.currentView.state.storedMarks
                    if (
                        storedMarks && storedMarks.some(mark => mark.type.name === 'rdf_property') ||
                        editor.currentView.state.selection.$head.marks().some(mark => mark.type.name === 'rdf_property')
                    ) {
                        return true
                    } else {
                        return false
                    }

                }
            }
        )
    }
}

class AnnotationDialog {
    constructor(editor) {
        this.editor = editor
        this.annotation = ''
        this.defaultAnnotation = 'property'
        this.annotationType = ''
        this.submitButtonText = gettext('Insert')
        this.dialog = false
    }

    init() {
        this.checkAnnotation()
        //this.findInternalTargets()
        this.createDialog()
    }
      // Check if there is an existing Annotation at the selection. If this is the case
    // use its values in dialog.

    checkAnnotation() {
        let state = this.editor.currentView.state,
            from = state.selection.from,
            annotationMark = state.selection.$from.marks().find(
                mark => mark.type.name === 'rdf_property'
            )
        if (annotationMark) {
           // this.extendSelectionToMark(from, linkMark)
            this.submitButtonText = gettext('Update')
            this.annotationType = annotationMark.attrs.annotationType ? annotationMark.attrs.annotationType : ''
            this.annotation = annotationMark.attrs.annotation
        }
    }
    createDialog() {

        let buttons = []

        buttons.push({
            text: this.submitButtonText,
            class: 'fw-button fw-dark',
            click: () => {
                let newAnnotationType = this.dialog.find('input.annotationType').val(),
                newAnnotation = this.dialog.find('input.annotation').val()

                // if ((new RegExp(/^\s*$/)).test(newLink) || newLink === this.defaultLink) {
                //     // The link input is empty or hasn't been changed from the default value.
                //     // Just close the dialog.
                //     this.dialog.dialog('close')
                //     this.editor.currentView.focus()
                //     return
                // }

                // if ((new RegExp(/^\s*$/)).test(linkTitle)) {
                //     // The link title is empty. Make it the same as the link itself.
                //     linkTitle = newLink
                // }

                this.dialog.dialog('close')
                selectParentNode(this.editor.currentView.state, this.editor.currentView.dispatch)
                let view = this.editor.currentView,
                    posFrom = view.state.selection.from,
                    posTo = view.state.selection.to,
                    markType = view.state.schema.marks.rdf_property.create({
                        annotationType: newAnnotationType,
                        annotation: newAnnotation
                    })
                // There is an empty selection. We insert the link title into the editor
                // and then add the link to that.
                // if (posFrom===posTo) {
                //     view.dispatch(view.state.tr.insertText(linkTitle, posFrom, posTo))
                //     posTo = posFrom + linkTitle.length
                // }

                view.dispatch(view.state.tr.addMark(
                    posFrom,
                    posTo,
                    markType
                ))
                view.focus()
                return
            }
        })

        buttons.push({
            text: gettext('Cancel'),
            class: 'fw-button fw-orange',
            click: () => {
                this.dialog.dialog('close')
                this.editor.currentView.focus()
            }
        })

        this.dialog = jQuery(AnnotationDialogTemplate({
            linkTitle: this.linkTitle,
            link: this.link,
            defaultLink: this.defaultLink,
        }))

        this.dialog.dialog({
            draggable: false,
            resizable: false,
            top: 10,
            width: 836,
            height: 360,
            modal: true,
            buttons,
            close: () => this.dialog.dialog('destroy').remove()
        })

    }
}


let AnnotationDialogTemplate = ({defaultAnnotation, annotation, annotationType}) =>
    `<div title="${gettext("Link")}">
       <input class="annotationType" type="text" value="${annotationType}" placeholder="${gettext("annotationType")}"/>
        <p></p>     
         <input class="annotation" type="text" value="${annotation}" placeholder="${gettext("annotation ")}"/>
    </div>`