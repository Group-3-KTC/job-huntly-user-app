import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CallToActionSection = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-100 rounded-lg p-8 flex items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Become a Candidate
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Cras cursus a dolor convallis
                                efficitur.
                            </p>
                            <Link href="/register">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    Register Now{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex-shrink-0 ml-8">
                            <img
                                src="/placeholder.svg?height=200&width=200&text=Candidate"
                                alt="Become a Candidate"
                                className="w-48 h-48 object-cover"
                            />
                        </div>
                    </div>

                    <div className="bg-blue-600 rounded-lg p-8 flex items-center text-white">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-4">
                                Become a Recruiter
                            </h3>
                            <p className="text-blue-100 mb-6">
                                Cras in massa pellentesque, mollis ligula non,
                                luctus dui. Morbi sed efficitur dolor. Pelque
                                augue risus, aliqu.
                            </p>
                            <Link href="/register">
                                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                                    Register Now{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex-shrink-0 ml-8">
                            <img
                                src=""
                                alt="Become an Recruiter"
                                className="w-48 h-48 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToActionSection;
