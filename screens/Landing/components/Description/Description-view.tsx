export const Description: React.FC = () => (
  <div className="flex flex-col ">
    <div className="text-left font-light py-2">Why choose the interview?</div>
    <h1 className="text-left font-medium text-4xl py-2">
      Revolutionize the way you hire.
    </h1>
    <div className="flex flex-col py-5 sm:py-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      <p className="text-left text-gray-600">
        Our platform streamlines the recruitment process by allowing companies
        to create custom job listings and add interview questions tailored to
        their specific needs. Candidates can then apply and record their answers
        in the form of asynchronous videos, saving time for both the candidate
        and the company.
      </p>
      <p className="text-left text-gray-600">
        Not only does this make the process more efficient, but it also allows
        for a more in-depth evaluation of the candidate's skills and
        qualifications. With The Interview, you can review candidate responses
        at your own pace, making it easy to compare and contrast candidates to
        find the perfect fit for your open position.
      </p>
      <p className="text-left text-gray-600">
        The Interview features a built-in rating system, allowing companies to
        easily evaluate and compare candidates by rating them based on
        qualifications, skills, and responses. This user-friendly feature
        streamlines the hiring process, making it easy to find the perfect fit
        for open positions and to make informed decisions.
      </p>
    </div>
  </div>
);

export default Description;
