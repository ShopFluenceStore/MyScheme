import React from "react";
const DisclaimerPage = () => {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--primary)] mb-6">Disclaimer</h1>
          
          <div className="prose max-w-none text-[var(--sub-text)] space-y-4">
            <p>
              Though all efforts have been made to ensure the accuracy of the
              contents on this platform, the same should not be construed as
              accurate reproduction of the text for use for any legal purposes.
            </p>
            <p>
              MeitY and NeGD accept no responsibility in relation to the accuracy,
              completeness, usefulness or otherwise, of the contents. In no event,
              Meity or NeGD will be liable for any loss, damage, liability or
              expense incurred or suffered that is claimed to have resulted from use
              of this platform, including, without limitation, any fault, virus,
              error, omission, interruption or delay, with respect thereto, indirect
              or remote.
            </p>
            <p>
              The use of platform is of the user&apos;s sole risk. User
              specifically acknowledges and agrees that Meity and NeGD are not
              liable for any conduct of any user.
            </p>
            <p>
              Links to other websites that have been included on this platform are 
              provided for public convenience only. However, Meity or NeGD is not 
              responsible for the contents or reliability of linked websites and does 
              not necessarily endorse the views expressed therein. Meity or NeGD does 
              not guarantee the availability of such linked pages at all times.
            </p>
            <p>
              Any disputes arising out of these terms and conditions, shall be subject 
              to the exclusive jurisdiction of the courts of India.
            </p>
            <p>
              Automated translations from English to Indian languages on this platform 
              is provisioned but it may not be precise. Some content including text, 
              applications, graphics and documents may not get translated. Automated 
              translation tool works well on Chrome and Mozilla Firefox browsers.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DisclaimerPage;
