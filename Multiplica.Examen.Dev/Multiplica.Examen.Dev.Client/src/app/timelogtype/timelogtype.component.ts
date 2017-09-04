import { AfterViewInit, ViewChild, ViewChildren, Component, QueryList, Input, OnInit, OnChanges, SimpleChange, ComponentRef, EventEmitter, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { DataService } from "../shared/services/data.service";
import { FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { GridDataResult, PageChangeEvent, GridComponent, SelectionEvent } from "@progress/kendo-angular-grid";
import { Http, URLSearchParams, Headers } from "@angular/http";
import { NotificationService, ILoader } from "../shared/services/notification.service";
import { NotificationMessage } from "../shared/ui/notificationmessage/notificationmessage";
import { TimeLogTypeDetailComponent } from "./timelogtype-detail.component";
import { SidePanelComponent } from "../shared/ui/sidepanel/sidepanel.component";
import { TimeLogTypeDto } from "./shared/timelogtypedto";
import { Title } from '@angular/platform-browser';
import { ValidationMessage } from "../shared/common/validationmessage";
import { Constants } from "../shared/common/constants";
import { GridSelection } from "../shared/ui/gridKendo/grid-selection.component";

declare var $: any;

@Component({
    selector: "timelogtype-app",
    templateUrl: "./timelogtype.component.html",
    providers: [NotificationService, GridSelection]
})

export class TimeLogTypeComponent implements OnInit, AfterViewInit {
    @ViewChild(SidePanelComponent) sidePanelComponent: SidePanelComponent;
    pageTitle: string = "Time Log Type Maintenance";
    loader: ILoader;
    notificationMessage: NotificationMessage = new NotificationMessage();
    fieldFilter: string = "";
    timeLogTypeDto: TimeLogTypeDto;
    titleSidePanel: string = "";
    isEdit: boolean = false;

    private gridView: GridDataResult;
    private getAllUrl: string = "timelogtypes/getAll";
    private getByIdUrl: string = "timelogtypes/getById";

    constructor(
        public notificationService: NotificationService,
        private http: Http,
        public dataService: DataService,
        private gridSelection: GridSelection,
        private titleService: Title
    ) {
        this.loader = this.notificationService.loader;
        this.notificationService.showLoader();
        this.titleService.setTitle(this.pageTitle);
    }

    ngOnInit() {
        $(document).ready((e) => {
            this.sidePanelComponent.bindSidePanelControls();
            this.notificationService.hideLoader();
            this.resizeKendoGrid("#grid-timeLogType");
        });
    }

    ngAfterViewInit() {
        this.getAll();
    }

    new(): void {
        this.openSidePanel(new TimeLogTypeDto(null, null), Constants.saveMode.NewMode);
    }

    public selectionChange(event: any): void {
        this.notificationMessage.clearAll();
        if (event.selected) {
            this.selectDataItemByIndex(event.index);
        }
        else {
            this.gridSelection.selectRow(window.event.target);
        }
    }

    selectDataItemByIndex(rowIndex) {
        let dataItem = this.gridView.data[rowIndex];
        if (dataItem) {
            debugger;
            this.openSidePanel(dataItem, Constants.saveMode.EditMode);
        } else {
            this.sidePanelComponent.closeSidePanel(false);
        }
    }

    getAll() {
        this.notificationMessage.clearAll();
        this.notificationService.showLoader();
        this.dataService.set(this.getAllUrl);
        this.dataService.get()
            .subscribe(result => {
                var dataResult: any = result.json();
                if (dataResult != null) 
                    this.gridView = {
                        data: dataResult,
                        total: dataResult.length
                    };
                else
                    this.gridView.data = [];
            },
            error => {
                this.notificationMessage.Errors.Add(ValidationMessage.errorGeneral);
            },
            () => {
                this.notificationService.hideLoader();
            });
    }

    getById() {
        this.notificationMessage.clearAll();
        var params = new URLSearchParams();
        params.set("timelogtypeid", (this.fieldFilter == null ? '0' : this.fieldFilter));
        this.notificationService.showLoader();
        this.dataService.set(this.getByIdUrl);
        this.dataService.get(params)
            .subscribe(result => {
                var dataResult: any = result.json();
                if (dataResult != null) {
                    var arr = [dataResult]
                    this.gridView = {
                        data: arr,
                        total: 1
                    };
                }
                else 
                    this.gridView.data = [];
            },
            error => {
                this.notificationMessage.Errors.Add(ValidationMessage.errorGeneral);
            },
            () => {
                this.notificationService.hideLoader();
            });
    }

    openSidePanel(timelogtypedto: TimeLogTypeDto, mode: number) {
        this.timeLogTypeDto = timelogtypedto;
        if (mode === Constants.saveMode.EditMode) {
            this.isEdit = true;
            this.titleSidePanel = "Edit Time Log Type";
        }

        if (mode === Constants.saveMode.NewMode) {
            this.isEdit = false;
            this.titleSidePanel = "New Time Log Type";
        }
        this.sidePanelComponent.sidePanelRowSelected = true;
        this.sidePanelComponent.openSidePanel(true);
    }

    resizeKendoGrid(nameGrid: string) {
        var _combinedPageElementsHeight = 0;
        var _viewportHeight = 0;
        var grid = $(nameGrid);
        $.each(grid.parent().siblings(), (e, v) => {
            _combinedPageElementsHeight += $(v).outerHeight();
        });
        _combinedPageElementsHeight += grid.find('.k-grid-content').parent().siblings('.k-grid-header').outerHeight();
        _viewportHeight += $(window).outerHeight() - _combinedPageElementsHeight;
        grid.find('.k-grid-content').height(_viewportHeight);
        $(nameGrid).height(_viewportHeight + 55);
    }

    onSaved() {
        this.getAll();
    }

    reset() {
        this.sidePanelComponent.closeSidePanel(false);
        this.notificationMessage.clearAll();
        this.gridView.data = [];
        this.fieldFilter = "";
    }
}