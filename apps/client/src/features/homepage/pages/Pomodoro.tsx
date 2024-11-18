import NavigationBar from "../components/NavigationBar";
import HeroSection from "../components/HeroSection";
import StarryBackground from "../components/StarryBackground";
import styled from "styled-components";
import FeatureCard from "../components/FeatureCard";
import PomodoroTechnique from "../components/PomodoroTechnique";
import DeveloperFeature from "../components/DeveloperFeature";
import StudyTogetherCTA from "../components/StudyTogetherCTA";
import HowItWork from "../components/HowItWork";
import TestimonialCard from "../components/TestimonialCard";
import Stats from "../components/Stats";
import CTA from "../components/CTA";
import { developerFeatures, features, pomodoroTechnique, testimonials } from "../utils/homepageData";
import Footer from "../components/Footer";

const Pomodoro = () => {

    return (
        <Container className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative">
            <StarryBackground />
            <NavigationBar />
            <HeroSection />
            <FeatureCard features={features} />
            <div className="min-h-screen  relative">
                <PomodoroTechnique pomodoroTechnique={pomodoroTechnique} />
                <DeveloperFeature developerFeatures={developerFeatures} />
                <StudyTogetherCTA />
            </div>
            <HowItWork />
            <TestimonialCard testimonials={testimonials} />
            <Stats />
            <CTA />
            <Footer />

        </Container>
    );
};

export default Pomodoro;

const Container = styled.div`
width: 100%;
box-sizing: border-box;



`