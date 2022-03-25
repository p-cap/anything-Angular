import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeHtml  } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: '<h1>pcap</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular’s XSS security model';


  // payload tester section
  payload:string;
  renderedPayload:SafeHtml;

  // interpolation
  payload2:string;
  interpolatedPayload2:string;

  // binding with innerHTML
  payload3:string;
  renderedPayload3: SafeHtml;

  // url / link section
  dangerousUrl: string;
  trustedUrl: SafeUrl;

  // render video section
  dangerousVideoUrl!: string;
  videoUrl!: SafeResourceUrl;

  
  constructor(private sanitizer: DomSanitizer) {

    // payload tester section
    this.payload = "";
    this.renderedPayload = "";

    // interpolation
    this.payload2 = "";
    this.interpolatedPayload2 = "";
    
    // using innerHTML binded property
    this.payload3 = "";
    this.renderedPayload3 = "";

    // untrusted vs trusted URLs
    this.dangerousUrl = 'javascript:alert("Hi there")';
    this.trustedUrl =  sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);

    // resource URLs
    this.updateVideoUrl('PUBnlbjZFAI');
  };
    
  // payload tester function
  payloadTester() {
      this.renderedPayload = this.sanitizer.bypassSecurityTrustHtml(this.payload);
      return this.renderedPayload;
  }

  // interpolation function
  interpolatePayload(){
      this.interpolatedPayload2=this.payload2;
      return this.interpolatedPayload2;
  }

  // binding with innerHTML
  renderUntrustedHTML() {
    return this.renderedPayload3 = this.payload3;
  }
  renderTrustedHTML() {
    this.renderedPayload3 = this.sanitizer.bypassSecurityTrustHtml(this.payload3)
    return this.renderedPayload3;
  }

  updateVideoUrl(id: string) {
      // Appending an ID to a YouTube URL is safe.
      // Always make sure to construct SafeValue objects as
      // close as possible to the input data so
      // that it's easier to check if the value is safe.
      this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
      this.videoUrl =
          this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
}
