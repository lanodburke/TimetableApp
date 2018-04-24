import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, Content, Segment } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { MenuController } from "ionic-angular";

import { TimetablesProvider } from "../../providers/timetables/timetables";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { ModuleDetailPage } from "../module-detail/module-detail";
import { AuthProvider } from "../../providers/auth/auth";

import { AlertController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(Segment) segment: Segment;

  courses: any;
  timetable: any;

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public storage: Storage,
    public modalCtrl: ModalController,
    public timetableProvider: TimetablesProvider,
    public alerCtrl: AlertController,
    public navParams: NavParams,
    public menuCtrl: MenuController
  ) {
    let today = new Date().getDay();
    switch (today) {
      case 1: {
        this.timetable = "monday";
        break;
      }
      case 2: {
        this.timetable = "tuesday";
        break;
      }
      case 3: {
        this.timetable = "wednesday";
        break;
      }
      case 4: {
        this.timetable = "thursday";
        break;
      }
      case 5: {
        this.timetable = "friday";
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  ionViewWillEnter() {}

  showModuleDetails(module, day) {
    console.log(module, day);
    this.navCtrl.push(ModuleDetailPage, {
      module: module,
      day: this.segment.value
    });
  }

  deleteModule(module, index) {
    console.log(module, index);
  }

  resize() {
    this.content.resize();
  }

  ionViewDidLoad() {
    this.storage.get("timetable").then(val => {
      if (val == null) {
        this.storage.get("user").then(value => {
          console.log(value.courseId);
          this.timetableProvider.getTimetable(value.courseId).then(data => {
            this.courses = data;
            console.log(data);
          });
        });
      } else {
        this.courses = val;
        console.log(this.courses);
      }
    });
  }
}
