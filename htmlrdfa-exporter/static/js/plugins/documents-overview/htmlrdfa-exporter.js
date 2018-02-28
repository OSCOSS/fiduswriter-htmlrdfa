import {getMissingDocumentListData} from "../../modules/documents/tools"

import {HTMLRDFaExporter} from "../../modules/htmlrdfa-exporter"

export class DocOverviewHTMLRDFa {
    constructor(documentOverview) {
        this.documentOverview = documentOverview
    }

    init() {
        let docSelectorMenu = this.documentOverview.menu.model.content.find(menu => menu.id==='doc_selector')

        docSelectorMenu.content.push(
            {
                title: gettext('Export selected as HTML+RDFa'),
                action: overview => {
                    let ids = this.documentOverview.getSelected()
                    if (ids.length) {
                        getMissingDocumentListData(
                            ids,
                            this.documentOverview.documentList
                        ).then(
                            () => ids.forEach(id => {
                                let doc = this.documentOverview.documentList.find(entry => entry.id===id)
                                new HTMLRDFaExporter(
                                    doc,
                                    {db:doc.bibliography},
                                    {db:doc.images},
                                    this.documentOverview.citationStyles,
                                    this.documentOverview.citationLocales
                                )
                            })
                        )
                    }
                }
            }
        )
    }
}
