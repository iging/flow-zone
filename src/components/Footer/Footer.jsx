import styled from "styled-components";

const Footer = () => {
  const newDate = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTextContainer>
          <CopyrightText>
            &copy; {newDate} <Highlight>Flow Zone</Highlight>. All rights
            reserved.
          </CopyrightText>
          <DeveloperText>
            Developed by <Highlight>akosikhada</Highlight>
          </DeveloperText>
        </FooterTextContainer>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  padding: 2rem 0;
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const CopyrightText = styled.p`
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.02em;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const DeveloperText = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Highlight = styled.span`
  color: #e74c3c;
  font-weight: 600;
`;
