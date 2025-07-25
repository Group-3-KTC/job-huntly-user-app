import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import recruiterImg from "@/assets/images/cta-recruiter.jpg";
import candidateImg from "@/assets/images/cta-candidate.jpg";
import Image from "next/image";

const CallToActionSection = () => {
    return (
        <section className="py-16">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="flex items-center p-8 bg-gray-100 rounded-lg">
                        <div className="flex-1">
                            <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                Become a Candidate
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Cras cursus a dolor convallis
                                efficitur.
                            </p>
                            <Link href="/register">
                                <Button className="text-white bg-blue-600 hover:bg-blue-700">
                                    Register Now{" "}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex-shrink-0 ml-8">
                            <Image
                                src={candidateImg}
                                alt="Become a Candidate"
                                className="object-cover w-48 h-48 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="flex items-center p-8 text-white bg-blue-600 rounded-lg">
                        <div className="flex-1">
                            <h3 className="mb-4 text-2xl font-bold">
                                Become a Recruiter
                            </h3>
                            <p className="mb-6 text-blue-100">
                                Cras in massa pellentesque, mollis ligula non,
                                luctus dui. Morbi sed efficitur dolor. Pelque
                                augue risus, aliqu.
                            </p>
                            <Link href="/register">
                                <Button className="text-blue-600 bg-white hover:bg-gray-100">
                                    Register Now{" "}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex-shrink-0 ml-8">
                            <Image
                                src={recruiterImg}
                                alt="Become an Recruiter"
                                className="object-cover w-48 h-48 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
