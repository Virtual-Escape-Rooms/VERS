import React from "react";

const failureEmails = [
  (_) => (
    <>
      <div className="contact-info">
        <div className="contact-circle alex">AL</div>
        <div className="contact-name">
          <span className="sender-name">Alex</span> <span className="sender-address">&lt;alex@aliensarereal.net&gt;</span>
        </div>
        <div className="contact-name">
          to: <span className="address">letters@nytimes.com</span>, <span className="address">tips@cnn.com</span>,{" "}
          <span className="address">sources@washpost.com</span>
        </div>
        <div className="contact-name">
          cc: <span className="address">team@aliensarereal.net</span>
        </div>
      </div>
      <div className="email-content">
        <p>To Whom It May Concern,</p>
        <p>
          Aliens are real, and the government is hiding them!!!! (Or... actually... they're hiding among the government...)
        </p>
        <p>
          Before you think I am some crazy person, I've attached PROOF below straight from the depths of Area 51.
        </p>
        <p>
          Get this out to the public ASAP and let them know everything they
          suspected is true. It's all TRUE!
        </p>
        <p className="sign-off">With Urgency,<br/> Alex</p>
        <div className="divider"></div>
        <h3>📎 7 Attachments</h3>
        <div className="file">
          <p>
            <img className="icon" src="/desktop/file.svg" alt="File icon" />
            IMG_2948.JPG
          </p>
        </div>
        <div className="file">
          <p>
            <img className="icon" src="/desktop/file.svg" alt="File icon" />
            IMG_2949.JPG
          </p>
        </div>
        <div className="file">
          <p>
            <img className="icon" src="/desktop/file.svg" alt="File icon" />
            IMG_2950.JPG
          </p>
        </div>
        <div className="file">
          <p>
            <img className="icon" src="/desktop/file.svg" alt="File icon" />
            translator.key
          </p>
        </div>
        <div className="file">
          <p>
            <img className="icon" src="/desktop/file.svg" alt="File icon" />
            transcript_20160103.pdf
          </p>
        </div>
        <div className="file">
          <p>
            <img className="icon" src="/desktop/file.svg" alt="File icon" />
            transcript_20160521.pdf
          </p>
        </div>
        <div className="file">
          <p>
            <img className="icon" src="/desktop/file.svg" alt="File icon" />
            journal_20151113.pdf
          </p>
        </div>
      </div>
    </>
  ),

  (_) => (
      <>
        <div className="contact-info">
          <div className="contact-circle">BP</div>
          <div className="contact-name">
            <span className="sender-name">Bean D. Paquet (NY Times)</span> <span className="sender-address">&lt;letters@nytimes.com&gt;</span>
          </div>
          <div className="contact-name">
            to: <span className="address">alex@aliensarereal.net</span>
          </div>
          <div className="contact-name">
            cc: <span className="address">team@aliensarereal.net</span>
          </div>
        </div>
        <div className="email-content">
          <p>Hello Alex,</p>
          <p>
            Thank you for the information! This is certainly big news. We'll forward this to our newsroom as soon as possible.
          </p>
          <p className="sign-off">Regards,<br/> Bean D. Paquet</p>
        </div>
      </>
  ),

  (_) => (
      <>
        <div className="contact-info">
          <div className="contact-circle">BM</div>
          <div className="contact-name">
            <span className="sender-name">Bartin Maron (Washington Post)</span> <span className="sender-address">&lt;sources@washpost.com&gt;</span>
          </div>
          <div className="contact-name">
            to: <span className="address">alex@aliensarereal.net</span>
          </div>
          <div className="contact-name">
            cc: <span className="address">team@aliensarereal.net</span>
          </div>
        </div>
        <div className="email-content">
          <p>Hello Alex,</p>
          <p>
            Thanks for notifying us! I'm shocked. This will make national headlines tomorrow. Do you have time for a quick chat about this tonight or tomorrow morning, to gather more details for the story?
          </p>
          <p className="sign-off">Best,<br/> Bartin Maron</p>
        </div>
      </>
  ),

  (_) => (
    <>
      <div className="contact-info">
        <div className="contact-circle">EM</div>
        <div className="contact-name">
          <span className="sender-name">Eredith Martley (CNN)</span> <span className="sender-address">&lt;tips@cnn.com&gt;</span>
        </div>
        <div className="contact-name">
          to: <span className="address">alex@aliensarereal.net</span>
        </div>
        <div className="contact-name">
          cc: <span className="address">team@aliensarereal.net</span>
        </div>
      </div>
      <div className="email-content">
        <p>Hello Alex,</p>
        <p>
          Thank you for sending this! We will get this story out to the public ASAP.
        </p>
        <p className="sign-off">Sincerely,<br/> Eredith Martley</p>
      </div>
    </>
  ),

  (failed) => (
    <>
      <div className="contact-info">
        <div className="contact-circle alex">AL</div>
        <div className="contact-name">
          <span className="sender-name">Alex</span> <span className="sender-address">&lt;alex@aliensarereal.net&gt;</span>
        </div>
        <div className="contact-name">
          to: <span className="address">team@aliensarereal.net</span>
        </div>
      </div>
      <div className="email-content">
        <p>
          Hey team,
        </p>
        <p>
          Thanks for all for your help. I couldn't have made it this far without you.
        </p>
        <p>
          I think we should quickly debrief. Let
          me know your thoughts{" "}
          <a href="//forms.gle/bYNKqATrJZBpuRAQA" target="_blank">
            here
          </a>
          !
        </p>
        <p className="sign-off">Thanks,<br/> Alex</p>
      </div>
    </>
  ),
];

const altFailureEmails = [
  (failed) => (
    <>
      <div className="contact-info">
        <div className="contact-circle alex">AL</div>
        <div className="contact-name">
          <span className="sender-name">Alex</span> <span className="sender-address">&lt;alex@aliensarereal.net&gt;</span>
        </div>
        <div className="contact-name">
          to: <span className="address">team@aliensarereal.net</span>
        </div>
      </div>
      <div className="email-content">
        <p>
          Hey team,
        </p>
        <p>
          So, team... I got captured by the FBI. On the bright side, jail is much more exciting than living alone in my apartment in New York. I'm getting decent food and human interaction, everyday! (Though I really miss New York pizza. The pizza here is not the same.)
        </p>
        <p>Anyway, thank you for all your help. This is still the most exciting thing that's happened to me in years and it would not have happened without you.</p>
        <p>
          Let's quickly debrief! This is the last email they let me send so please let me know your thoughts{" "}
            <a href="//forms.gle/bYNKqATrJZBpuRAQA" target="_blank">
              here
            </a>
            .
        </p>

        <p className="sign-off">Thanks,<br/> Alex</p>
      </div>
    </>
  ),
]

export default failureEmails;
