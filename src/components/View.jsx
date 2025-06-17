import React from "react";
import { FaStar } from "react-icons/fa";

const commonStyles = {
    container: "flex flex-col overflow-hidden shadow-xl",
    card: "flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7",
    rating: "flex items-center text-[#FDB241]",
    testimonial: "flex-1 mt-8",
    testimonialText: "text-lg leading-relaxed text-gray-900 font-pj",
    profile: "flex items-center mt-8",
    profileImage: "flex-shrink-0 object-cover rounded-full w-11 h-11",
    profileInfo: "ml-4",
    profileName: "text-base font-bold text-gray-900 font-pj",
    profileRole: "mt-0.5 text-sm font-pj text-gray-600",
    link: "pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600",
};

// Creating stars
function renderStars(count = 5) {
    return Array.from({ length: count }, (_, index) => <FaStar key={index} />);
}


function View() {
    return (
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-lg font-medium text-gray-600 font-pj">
                        100+ people have said how good we are
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                        Our happy clients say about us
                    </h2>
                </div>
                <div className="relative mt-10">
                    <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                        <div className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                            style={{
                                background:
                                    "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
                            }}
                        ></div>
                    </div>
                    <div className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3">
                        {/* Testimonial 1 */}
                        <div className={commonStyles.container}>
                            <div className={commonStyles.card}>
                                <div className={commonStyles.testimonial}>
                                    <div className={commonStyles.rating}>{renderStars(5)}</div>
                                    <blockquote className={commonStyles.testimonialText}>
                                        You made it so simple. My new site is so much faster and
                                        easier to work with than my old site. I just choose the
                                        page, make the change.
                                    </blockquote>
                                </div>
                                <div className={commonStyles.profile}>
                                    <img
                                        className={commonStyles.profileImage}
                                        src="https://www.auraui.com/memeimage/man2.jpg"
                                        alt="Leslie Alexander"
                                    />
                                    <div className={commonStyles.profileInfo}>
                                        <p className={commonStyles.profileName}>Leslie Alexander</p>
                                        <p className={commonStyles.profileRole}>
                                            Freelance React Developer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className={commonStyles.container}>
                            <div className={commonStyles.card}>
                                <div className={commonStyles.testimonial}>
                                    <div className={commonStyles.rating}>{renderStars(5)}</div>
                                    <blockquote className={commonStyles.testimonialText}>
                                        We filled a key role within days using this platform. The quality of applicants was impressive, and the dashboard made managing candidates effortless.
                                    </blockquote>
                                </div>
                                <div className={commonStyles.profile}>
                                    <img className={commonStyles.profileImage} src="https://www.auraui.com/memeimage/man1.jpg" alt="Jacob Jones"/>
                                    <div className={commonStyles.profileInfo}>
                                        <p className={commonStyles.profileName}>Jacob Jones</p>
                                        <p className={commonStyles.profileRole}>Digital Marketer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className={commonStyles.container}>
                            <div className={commonStyles.card}>
                                <div className={commonStyles.testimonial}>
                                    <div className={commonStyles.rating}>{renderStars(5)}</div>
                                    <blockquote className={commonStyles.testimonialText}>
                                        This site helped me land my dream job in less than two weeks. The application process was simple, and I loved how the platform matched me with roles that actually fit my experience.
                                    </blockquote>
                                </div>
                                <div className={commonStyles.profile}>
                                    <img className={commonStyles.profileImage} src="https://www.auraui.com/memeimage/boy1.jpeg" alt="Chris Johnson" />
                                    <div className={commonStyles.profileInfo}>
                                        <p className={commonStyles.profileName}>Chris Johnson</p>
                                        <p className={commonStyles.profileRole}>Product Manager</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default View;