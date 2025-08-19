import styled from "styled-components";

const About = () => {
  return (
    <AboutContainer>
      <ContentWrapper>
        <Section>
          <AboutTitle>
            <Highlight>What</Highlight> is Pomodoro Technique?
          </AboutTitle>
          <AboutText>
            The Pomodoro Technique is created by Francesco Cirillo for a more
            productive way to work and study. The technique uses a timer to
            break down work into intervals, traditionally 25 minutes in length,
            separated by short breaks. Each interval is known as a pomodoro,
            from the Italian word for &apos;tomato&apos;, after the
            tomato-shaped kitchen timer that Cirillo used as a university
            student.
          </AboutText>
        </Section>

        <Section>
          <AboutTitle>
            <Highlight>What</Highlight> is Flow Zone?
          </AboutTitle>
          <AboutText>
            Flow Zone is a small clone project inspired by{" "}
            <Link
              href="https://pomofocus.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              pomofocus.io
            </Link>
            . This application is built with React and styled with Styled
            Components. It employs the Pomodoro Technique, helping users break
            down their work into focused intervals interspersed with short
            breaks. This approach enhances concentration, minimizes
            distractions, and ultimately boosts overall productivity.
          </AboutText>
        </Section>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;

const AboutContainer = styled.div`
  width: 100%;
  padding: 2rem;
  margin: 6rem auto 8rem;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 3rem auto 4rem;
    padding: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 65rem;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AboutTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Highlight = styled.span`
  color: #e74c3c;
`;

const AboutText = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.02rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: justify;
    letter-spacing: 0.03rem;
    word-spacing: 0.05rem;
    hyphens: auto;
  }
`;

const Link = styled.a`
  color: #ff6e6e; /* Brighter red for better contrast */
  font-weight: 700;
  text-decoration: underline;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover,
  &:focus {
    color: #ff8a8a;
    text-decoration: none;
  }
`;
