import { Component, Pipe, PipeTransform, OnInit, HostListener, Input, ElementRef, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AsEnumerable } from "linq-es5";
declare var $: any;

@Component({
    selector: 'side-panel',
    templateUrl: "./sidepanel.component.html"
})

export class SidePanelComponent {
    @Input() nameGridRelatedToSidePanel: string;
    @Input() nameSidePanel: string; 
    @Input() nameToogleView: string;
    @Output() onAfterClose = new EventEmitter();

    public sidePanelRowSelected: boolean = false;
    public contentGridSidePanel: boolean = false;
    public showPanel: boolean = false;

    ngOnInit() {
        $(window).bind('load resize scroll', (e) => {
            this.resizeSidePanelContent();
        });
    }

    bindSidePanelControls() {
        var $toggleView = this.getToggleView();
        $toggleView.click((e) => {
            if ($(e.currentTarget).has(".xico-action-close").length) {
                this.closeSidePanel(e.currentTarget);
            }
            else {
                this.openSidePanel(e);
            }
        });
        this.bindExpandedSidePanel();
    }

    bindExpandedSidePanel() {
        var grid = $("#" + this.nameGridRelatedToSidePanel);
        var $container = this.getContainer();
        $container.find(".xico-dots").click((e) => {
            grid.find("table").width($(window).width());
            var $container = this.getContainer();
            if ($container.hasClass("panel-open-expanded")) {
                $container.removeClass("panel-open-expanded").addClass("panel-open");
                grid.removeClass("expanded");
                grid.find(".k-grid-header").css("width", "60%");
                grid.find(".k-grid-content").css("width", "60%");

                grid.find(".ro-table-header").css("width", "60%");
                grid.find(".ro-table-content").css("width", "60% ");

            }
            else {
                $container.removeClass("panel-open").addClass("panel-open-expanded");
                grid.addClass("expanded");
                grid.find(".k-grid-header").css("width", "30%");
                grid.find(".k-grid-content").css("width", "30%");

                grid.find(".ro-table-header").css("width", "30%");
                grid.find(".ro-table-content").css("width", "30%");
            }
        });
    }

    openSidePanel(event) {
        if (!this.sidePanelRowSelected) return false;
        var grid = $("#" + this.nameGridRelatedToSidePanel);
        grid.addClass("side-panel-openned");
        grid.find("table").width($(window).width());
        grid.find(".k-grid-header").css("width", "30%");
        grid.find(".k-grid-content").css("width", "30%");

        grid.find(".ro-table-header").css("width", "30%");
        grid.find(".ro-table-content").css("width", "30%");
        var $toggleView = this.getToggleView();
        $toggleView.removeClass("glance-view");
        $toggleView.find("i").removeClass("xico-glance-view isInactive").addClass("xico-action-close");
        var $container = this.getContainer();
        $container.addClass("remove-open").addClass("panel-open-expanded");
        $container.show();
        setTimeout(this.resizeSidePanelContent(), 10);
    }

    closeSidePanel(sender) {
        var isFromCloseButton = (!sender) ? false : true;
        sender = (!sender) ? this.getToggleView() : sender;
        this.getContainer().hide();
        $(sender).addClass("glance-view");

        if (isFromCloseButton)
            $(sender).find("i").removeClass("xico-action-close").addClass("xico-glance-view");
        else
            $(sender).find("i").removeClass("xico-action-close").addClass("xico-glance-view isInactive");

        var grid = $("#" + this.nameGridRelatedToSidePanel);
        grid.removeClass("side-panel-openned");
        grid.find("table").width("100%");
        grid.find(".k-grid-header").css("width", "100%");
        grid.find(".k-grid-content").css("width", "100%");

        grid.find(".ro-table-header").css("width", "100%");
        grid.find(".ro-table-content").css("width", "100%");

        if (this.onAfterClose !== undefined)
            this.onAfterClose.emit("");
        if (!isFromCloseButton) grid.find(".k-grid-content").find("td.active").removeClass("active");
    }

    // Sets the height of the content
    resizeSidePanelContent() {
        var $container = this.getContainer();
        var height = $container.outerHeight() - $container.find('header').outerHeight() - (isNaN($container.find('[data-well]').outerHeight()) ? 0 : $container.find('[data-well]').outerHeight()) - 15; // -15 mimics the padding of the panel
        $container.find('.main').css('height', height);
    }

    getContainer() {
        var $container = null;
        if (this.nameSidePanel) {
            $container = $("div[id='" + this.nameSidePanel + "']");
        }
        else {
            $container = $("div[data-panel='side-panel']");
        }
        return $container;
    }

    getToggleView() {
        var $toggleView = null;
        if (this.nameToogleView) {
            $toggleView = $("div[id='" + this.nameToogleView + "']");
        }
        else {
            $toggleView = $("div[data-sidepanel-toggleview]");
        }
        return $toggleView;
    }

    enableToggleView() {
        this.getToggleView().find("i").removeClass("isInactive");
    }
}