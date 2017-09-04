declare var $: any;
export class GridSelection {
    lastRowIndexSelected: number;
    gridName: string;
    public selectRow(row) {
        setTimeout(() => $(row).click());
    }
    public selectRowByLastRowIndex() {
        if (this.lastRowIndexSelected != null) {
            setTimeout(() => {
                var row = $("#" + this.gridName).find('table:last').find('tr').eq(this.lastRowIndexSelected)
                if (row && row.length > 0) {
                    row.click();
                    return true;
                } else {
                    this.lastRowIndexSelected = null;
                }
            });
        }
        return false;
    }
    public getRowIndexSelected() {
        var row = $("#" + this.gridName).find("[kendogridtablebody]").find("tr.k-state-selected:first");
        return row.index();
    }
    public getRowSelected() {
        return $("#" + this.gridName).find("[kendogridtablebody]").find("tr.k-state-selected:first");
    }
    public unselectRowGrid(timeout: Number = 0) {
        setTimeout(() => $("#" + this.gridName).find("[kendogridtablebody]").find("tr.k-state-selected").removeClass("k-state-selected"), timeout);
    }
}