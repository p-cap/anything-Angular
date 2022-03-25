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

  // notice the difference in declaration
  htmlSnippet = 'Template <style>@keyframes x{}</style><img style="animation-name:x" onanimationstart="alert(1)"></img><b>Syntax</b>';
  htmlSnippet2: SafeHtml;

  // notice the difference in declaration
  dangerousUrl: string;
  trustedUrl: SafeUrl;


  // notice the difference in declaration
  dangerousVideoUrl!: string;
  videoUrl!: SafeResourceUrl;

  // payloadification
  payload:string;
  payload2:string;
  payload3:string;


  // returns to the page  
  msg: string;
  msg2: SafeHtml;
  msg3: string;
  msg4: SafeHtml;

  
  constructor(private sanitizer: DomSanitizer) {

      // untrusted vs trusted tags
      this.htmlSnippet2 = this.sanitizer.bypassSecurityTrustHtml(
      this.htmlSnippet);

      // untrusted vs trusted URLs
      this.dangerousUrl = 'javascript:alert("Hi there")';
      this.trustedUrl =  sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);

      //
      this.updateVideoUrl('PUBnlbjZFAI');
      this.payload = "";
      this.payload2 = "";
      this.payload3 = "";
      this.msg = "";
      this.msg2 = "";
      this.msg3 = "";
      this.msg4 = "";

 
    };
   
    clickEvent(){
      this.msg=this.payload;
      return this.msg;
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

    submitPayload() {
        this.msg2 = this.sanitizer.bypassSecurityTrustHtml(
          this.payload2);
        return this.msg2;

    }

    testInnerHtml() {
      return this.msg4 = this.payload3;
    }

    testInnerHtml2() {
      this.msg4 = this.sanitizer.bypassSecurityTrustHtml(this.payload3)
      return this.msg4;
    }
}
