export const Header: React.FC = () => (
  <div className={`flex flex-col md:flex-row `}>
    <h2 className={`text-left text-2xl font-thin pb-2 md:w-1/6`}>
      Say <span className={`text-4xl font-normal `}>goodbye</span> to endless
      resumes and in-person interviews, and{' '}
      <span className={`text-4xl font-normal text-purple-800`}>hello</span> to a
      smarter, more efficient way
    </h2>
    <div className={`mt-16 scale-105 md:scale-100 md:mt-0 md:w-5/6 `}>
      <img src="/mac.svg" alt="Mac computer" />
    </div>
  </div>
);

export default Header;
