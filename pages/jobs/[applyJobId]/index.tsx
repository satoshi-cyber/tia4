import { Layout, PrimaryButton, Title } from '@/components';
import { URLS } from '@/config';
import { useRouter } from 'next/router';

const Apply = () => {
  const router = useRouter();

  const handleApply = () => {
    router.push(
      URLS.APPLY.replace('[applyJobId]', router.query.applyJobId as string)
    );
  };

  return (
    <Layout.Apply>
      <Title title="Software engeener" subTitle="NEOM LLC" />
      <div className="job-apply" id="job-details" tabIndex={-1}>
        <span>
          <p>
            NEOM is a new vision of what the future could be. It's an attempt to
            do something that's never been done before and it's coming at a time
            when the world needs fresh thinking and new solutions. Put simply,
            NEOM will not only be a destination, but a home for people who dream
            big and who want to be part of building a new model for sustainable
            living.
          </p>
          <p>
            <br />
          </p>
          <p>
            <strong>Role Purpose</strong>
          </p>
          <p>
            <br />
          </p>
          <p>
            The role has aspects of a developer community product manager and a
            technical product manager, to evaluate market opportunities, develop
            and own product requirements, and implementation roadmap in
            consultation with technology partners. The role also includes
            product evangelization to encourage adoption and seek out new ideas.
          </p>
          <p>
            <br />
          </p>
          <p>
            <strong>Key Accountabilities &amp; Activities</strong>
          </p>
          <p>
            <br />
          </p>
          <ul>
            <li>
              Working with all internal and external stakeholders to effectively
              define and bring to market a scalable platform, solutions and
              tools that address customer needs while meeting our high standards
              in Tech and Digital.
            </li>
            <li>
              Overseeing the growth and product development for Digital Twin
              Exchange platform (DTX).
            </li>
            <li>
              Build the strategy and define the roadmap for enhancing
              Construction Tech platform services using existing T&amp;D
              platforms DTX and Cognitive Lens
            </li>
            <li>
              Drive the vision and requirements, translate them to functional
              specifications for the platform team to execute on
            </li>
            <li>Prioritize and manage a product backlog</li>
            <li>
              Facilitate requirements definition while identifying dependencies
              and relative priority
            </li>
            <li>Conduct onboarding sessions and build developer enthusiasm.</li>
            <li>
              Integrate usability studies, research, and market analysis into
              product requirements that accelerate developer adoption of APIs
              and developer tools.
            </li>
            <li>
              Making sure solutions built on DTX are of high quality, meeting
              business and operational performance indicators and delivering
              great customer experience.
            </li>
            <li>
              Budget – aware of team's budget needs and communicate as needed on
              under/overspend
            </li>
            <li>
              Self-motivated and able to own workload to deliver results on
              self-driven deadlines.
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>
            <strong>Knowledge Skills &amp; Experience</strong>
          </p>
          <p>
            <br />
          </p>
          <ul>
            <li>
              10+ years' experience in technical product management for software
              products
            </li>
            <li>Experience in the construction technology domain</li>
            <li>
              Knowledge of Building Information Modelling (BIM) tools and
              processes
            </li>
            <li>High performing individual with proven track-record</li>
            <li>
              Organizational skills, ability to plan, and manage multi-faceted
              programs
            </li>
            <li>Ability to work collaboratively in a team environment</li>
            <li>Strong inter-personal skills</li>
            <li>
              Ability to communicate and articulate complex concepts and
              developer problems effectively – both verbally and in writing
            </li>
            <li>
              A passion for creating a great developer experience and solving
              customer problems
            </li>
          </ul>
          <p>
            <br />
          </p>
          <p>
            <strong>Qualifications</strong>
          </p>
          <p>
            <strong> </strong>
          </p>
          <ul>
            <li>
              Bachelor's degree in Computer Science, Engineering, or related
              degree
            </li>
            <li>
              Received formal or on the job training in product management
            </li>
            <li>
              Demonstrated ability to understand complex platform architecture
              and define application requirements in that context.
            </li>
            <li>
              Received formal or the on-the-job training in using iterative or
              Agile methodologies (e.g., SCRUM)
            </li>
            <li>
              Has built developer tools or APIs, either as a product manager or
              as a software engineer
            </li>
            <li>
              Demonstrated analytical / data-driven approach to product
              definition.
            </li>
            <li>
              Worked with ISVs and Solution Providers to build integrations and
              solutions as part of an ecosystem.
            </li>
            <li>Fluent in tools such as JIRA, Confluence and GitHub</li>
            <li>
              Experience acting in the role of a Solution Architect, with
              ability to build data models is desired
            </li>
            <li>
              Working knowledge in the use of JavaScript, React would be
              advantageous
            </li>
          </ul>
        </span>
      </div>
      <PrimaryButton
        title="Apply now"
        className="w-full mt-10 sticky bottom-6"
        onClick={handleApply}
      />
    </Layout.Apply>
  );
};

export default Apply;
