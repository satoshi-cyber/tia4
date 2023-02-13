import { getAssetUrl } from '@/lib';

const Security: React.FC = () => (
  <div className="py-5 sm:py-6">
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-2/3 mb-3 sm:mb-4">
        <div className="max-w-sm">
          <p className="text-left font-thin py-2">The interview lets you</p>
          <h2 className="text-left text-4xl mb-3">
            Always have control over your data
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <img
            className="max-w-[400px] py-2 px-20 md:p-2 mt-5 "
            alt="Security"
            loading="lazy"
            src={getAssetUrl('/images/privacy.png')}
          />
        </div>
      </div>
      <div className="w-full sm:w-1/3 mb-3 sm:mb-4 grid gap-8">
        <div>
          <h3 className="font-thin text-lg sm:text-xl text-left mb-2 sm:mb-3">
            GDPR compliant
          </h3>
          <p className="text-left text-md text-gray-800">
            The Interview prides itself on competing aggressively while holding
            ourselves to the highest ethical standards, including conduct of our
            data handling practices. While many businesses are still unaware of
            the impact the GDPR will have on their business, dedicated teams at
            The Interview have been preparing to ensure GDPR readiness.
          </p>
        </div>
        <div>
          <h3 className="font-thin text-lg sm:text-xl text-left mb-2 sm:mb-3 ">
            Passwordless
          </h3>
          <p className="text-left text-md text-gray-800">
            We understand the importance of security and the need to protect
            your sensitive information. That's why we have implemented a unique
            method of authentication that eliminates the need for passwords.
            Instead of requiring a password, our platform utilizes magic links,
            which are sent to your registered email address.
          </p>
        </div>
        <div>
          <h3 className="font-thin text-lg sm:text-xl text-left mb-2 sm:mb-3">
            Secure file storage
          </h3>
          <p className="text-left text-md text-gray-800">
            Our platform uses decentralized storage which ensures that your
            sensitive files are not stored in a single location, reducing the
            risk of data breaches and unauthorized access. This method of
            storage distributes your data across multiple nodes, making it more
            difficult for hackers to target and compromise your information.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Security;
