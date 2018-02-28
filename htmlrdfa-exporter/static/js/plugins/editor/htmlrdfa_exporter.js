import {HTMLRDFaExporter} from "../../modules/htmlrdfa_exporter"

export class EditorHTMLRDFa {
    constructor(editor) {
        this.editor = editor
    }

    init() {
        let exportMenu = this.editor.menu.headerbarModel.content.find(menu => menu.id==='export')

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
    }
}
