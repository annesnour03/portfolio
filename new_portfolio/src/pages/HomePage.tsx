import React, { useCallback, useEffect, useId, useState } from "react";
import { IconType } from "react-icons";
import { FaChess, FaGithub, FaLinkedin } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { crafterlogo, uvalogo, weplogo } from "assets/logos";
import { openLink } from "helpers/General";

import "react-vertical-timeline-component/style.min.css";

import styled from "styled-components";
import tw from "tailwind-styled-components";
// @ts-expect-error
import BIRDS from "vanta/dist/vanta.birds.min";

import "../App.css";

import {
  GITHUB_URL,
  KFC_URL,
  LICHESS_URL,
  LINKEDIN_URL,
  myAge,
  R6_PROFILE_URL,
} from "../appconstants/constants";
import { RevealView, StarsCanvas } from "../components";

const ProjectView: React.FC = () => {
  const t = styled.div`
    flex: 0 0 100%;
    transition: all 0.5;
    box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.5);
    will-change: transform;
  `;
  const Card = tw(t)`
  flex
  p-2
  flex-col
  shadow-xl
  bg-zinc-800
  rounded-xl
  card
  snap-start
  cursor-grab
  `;

  useEffect(() => {
    const slider = document.getElementById("cards");
    if (!slider) return;
    let isDown = false;
    let startX: number = 0;
    let scrollLeft: number = 0;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    });
  }, []);

  return (
    <div
      id="cards"
      className="cards-scroll-bar snap-x1 snap-mandatory1 my-5 flex h-96 overflow-x-scroll px-2 py-5 pr-5 "
    >
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Card key={i}>{i}</Card>
      ))}
    </div>
  );
};

const ExperienceTimeLine: React.FC = () => {
  const MainTitle = tw.h2`
  vertical-timeline-element-title
  font-bold
  `;
  return (
    <div className="select-none">
      <VerticalTimeline>
        <VerticalTimelineElement
          className="active-activity text-white"
          date="Jan 2024 - present"
          icon={
            <img
              alt="uva"
              className="select-none rounded-full"
              draggable={false}
              src={uvalogo}
            />
          }
        >
          <div className="text-black">
            <MainTitle>Student Programmer</MainTitle>
            <h3 className="vertical-timeline-element-title font-bold">
              University of Amsterdam
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              React, RTK query, Redux state management
            </h4>
            <p>
              Contributed to making a new version of DataNose (2.0), a UvA wide
              system.
            </p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="text-white"
          date="Sep 2023 - Dec 2023"
          icon={
            <img
              alt="uva"
              className="select-none rounded-full"
              draggable={false}
              src={uvalogo}
            />
          }
        >
          <div className="text-black">
            <MainTitle>Internship</MainTitle>
            <h3 className="vertical-timeline-element-title font-bold">
              University of Amsterdam
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              React, RTK query, Redux state management
            </h4>
            <p>
              Contributed to making a new version of DataNose (2.0), a UvA wide
              system.
            </p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="text-white"
          date="2022 - 2023"
          icon={
            <img
              alt="uva"
              className="select-none rounded-full"
              draggable={false}
              src={uvalogo}
            />
          }
        >
          <div className="text-black">
            <MainTitle>Student Programmer</MainTitle>
            <h3 className="vertical-timeline-element-title font-bold">
              University of Amsterdam
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              C#, ASP.NET, GraphAPI, React, Docker
            </h4>
            <p>Designed software tools used to help the budgeting of FNWI.</p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="text-white"
          date="2022 - Jan 2024"
          icon={
            <img
              alt="wep"
              className="select-none rounded-full"
              draggable={false}
              src={weplogo}
            />
          }
        >
          <div className="text-black">
            <MainTitle>Full stack lead developer</MainTitle>
            <h3 className="vertical-timeline-element-title font-bold">
              WePartyNow
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              React, React-Native, Django, Typescript, AWS
            </h4>
            <p>
              Managed and maintained the infrastructure and reworked app & web.
            </p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="text-white"
          date="2022"
          icon={
            <img
              alt="crafter"
              className="select-none rounded-full"
              draggable={false}
              src={crafterlogo}
            />
          }
        >
          <div className="text-black">
            <MainTitle>Junior full stack developer</MainTitle>
            <h3 className="vertical-timeline-element-title font-bold">
              Crafter B.V
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Django, Vue, Typescript, SaltStack, SQL
            </h4>
            <p>Maintained and created new features that served </p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education active-activity"
          date="September 2021 - present"
          iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
          icon={
            <img
              alt="uva"
              className="select-none rounded-full"
              draggable={false}
              src={uvalogo}
            />
          }
        >
          <div className="text-black">
            <h2 className="vertical-timeline-element-title font-bold">
              3rd year of BSc Computer Science
            </h2>
            <h3 className="vertical-timeline-element-title font-bold">
              University of Amsterdam
            </h3>
            <p>Current GPA: 7.81</p>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

const PersonalInformation: React.FC = () => {
  const HobbyIcon = ({
    Icon,
    onClick,
  }: {
    Icon: IconType;
    onClick: () => void;
  }) => {
    return (
      <>
        <div className="h-32 w-32 flex-1 flex-col">
          <div className="flex-1 grow ease-linear" onClick={onClick}>
            {
              <Icon className="ml-auto mr-auto h-auto w-32 hover:scale-125 hover:cursor-pointer" />
            }
          </div>
          <div className="flex h-auto items-center justify-center"></div>
        </div>
      </>
    );
  };

  return (
    <div className="flex overflow-hidden py-5 max-md:flex-col ">
      {/* Text about me */}
      <div className="max-h-96  w-1/3 overflow-hidden p-2 max-md:w-full">
        <p className="text-md font-normal">
          I'm a {myAge}-year-old Computer Science student at the University of
          Amsterdam with a passion for web development and software design. I
          create functional and aesthetic solutions that prioritize user
          experience. With exceptional dedication, I am eager to take on new
          challenges and collaborate with others to achieve the best results.
        </p>
      </div>
      <div className="flex w-2/3 flex-col p-2 max-md:w-full">
        {/* Title */}
        <div className="flex h-fit w-full items-center justify-center"></div>
        <div className="flex h-full items-center justify-center">
          {/* Items */}
          <div className="flex flex-wrap justify-center gap-5 gap-x-24 max-md:flex-col max-md:items-center">
            <HobbyIcon Icon={FaChess} onClick={() => openLink(LICHESS_URL)} />
            <HobbyIcon
              Icon={IoGameController}
              onClick={() => openLink(R6_PROFILE_URL)}
            />
            <HobbyIcon Icon={GiCook} onClick={() => openLink(KFC_URL)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  const SocialIcon = ({
    Icon,
    onClick,
  }: {
    Icon: IconType;
    onClick: () => void;
  }) => {
    return <Icon className="cursor-pointer" size={64} onClick={onClick} />;
  };

  return (
    <div className="flex items-center justify-center gap-10">
      <SocialIcon Icon={FaGithub} onClick={() => openLink(GITHUB_URL)} />
      <SocialIcon Icon={FaLinkedin} onClick={() => openLink(LINKEDIN_URL)} />
    </div>
  );
};
export const HomePage = () => {
  const [vantaEffect, setVantaEffect] = useState<unknown>(0);
  const vantaRef = React.useRef(null);
  function useScrollTo(): [string, () => void] {
    const id = useId(); // Random string as id.
    const handleScroll = useCallback(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, [id]);

    return [id, handleScroll];
  }
  const [experienceSection, scrollToExperienceSection] = useScrollTo();
  const [informationSection, scrollToInformationSection] = useScrollTo();

  React.useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          birdSize: 2,
          quantity: 4.0,
          // backgroundColor: 0x10e1b,
          backgroundAlpha: 0.0,
          color1: 0x461b1b,
        })
      );
    }
    return () => {
      // @ts-ignore NOTE: unfortunately vanta does not have types available.
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const LinkButton = tw.div`
    flex
    items-center
    text-white
    select-none
    //hover:bg-slate-500
    hover:cursor-pointer
    `;

  return (
    <>
      {/* Star birds */}
      <div className="max-h-screen overflow-y-scroll">
        <StarsCanvas />
        <section className="hidden1 relative h-screen">
          <div className="absolute z-10 w-full">
            <header className="flex h-16 justify-center gap-3 bg-transparent align-baseline">
              <LinkButton>Home</LinkButton>
              <LinkButton>
                <Link to="/terminal">Terminal</Link>
              </LinkButton>
              <LinkButton onClick={() => scrollToExperienceSection()}>
                Experience
              </LinkButton>
            </header>
          </div>
          <div className=" vanta flex  h-full flex-col" ref={vantaRef}>
            {/* Text wrapper */}
            <div className="align-center flex h-full w-full select-none justify-center">
              <div className="flex flex-col place-content-center items-center text-center text-6xl">
                <h2 className="font-light">Hi! I'm&nbsp;</h2>
                <h2 className="text-blue-500">Annes Negmel-Din.</h2>
              </div>
            </div>
            {/* Scroll down indicator */}
            <div
              className="mouse_scroll cursor-pointer"
              onClick={() => scrollToInformationSection()}
            >
              <span className="m_scroll_arrows unu"></span>
              <span className="m_scroll_arrows doi"></span>
              <span className="m_scroll_arrows trei"></span>
            </div>
          </div>
        </section>
        {/* Information */}
        <section className="ml-20 mr-20 h-screen snap-center pt-10 text-white">
          <div id={informationSection} className="text-3xl font-light">
            <h2 className="bounce-in1 text-5xl font-bold">Introduction</h2>
          </div>
          <PersonalInformation />
          <div id={experienceSection} className="hidden1 my-10">
            <RevealView>
              <h2 className="bounce-in1 text-5xl font-bold">Work Experience</h2>
            </RevealView>
            <ExperienceTimeLine />
          </div>

          {/* Slides with projects */}
          <div className="my-10" hidden>
            <RevealView>
              <h2 className="bounce-in1 text-5xl font-bold">Projects</h2>
            </RevealView>
            <ProjectView />
          </div>

          {/* Footer */}
          <section className="my-5 mb-10">
            <div>
              <Footer />
            </div>
          </section>
        </section>
      </div>
    </>
  );
};
