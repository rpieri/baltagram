import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.page.html',
  styleUrls: ['./take-photo.page.scss'],
})
export class TakePhotoPage implements AfterViewInit {

  constructor(
    private navCrtl: NavController
  ) { }

  ngAfterViewInit(){
    var video = <any>document.getElementById('video');

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { aspectRatio: 1 } })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (err) {
          console.log("Não rolou carregar o vídeo");
        });
    }
  }

  takePicture(){
    var video = <any>document.getElementById('video');
    var canvas = <any>document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, 1000, 1000);
    localStorage.setItem('baltagram.post', JSON.stringify(new Post(canvas.toDataURL(), '', '')));

    video.classList.add('animated');
    video.classList.add('flash');

    setTimeout(() => this.navCrtl.navigateForward('/post'), 1000);
  }

}
