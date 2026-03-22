import { motion } from 'framer-motion'

export function Experience() {
    return (
        <section id="experience" className="py-12 px-4 border-t border-zinc-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-6">Experience</h2>
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative pl-8 border-l border-zinc-800"
                    >
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-zinc-950"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">Software Engineering Virtual Experience Program</h3>
                            <span className="text-sm text-zinc-500">Aug 2025</span>
                        </div>
                        <p className="text-blue-400 text-sm mb-3">J.P. Morgan (Forage) | Remote</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Completed a virtual software engineering program focused on real-world financial application development.

Set up a local development environment and worked with Java and Spring Boot.

Integrated Apache Kafka for data streaming and messaging between services.

Used H2 Database for data storage and testing purposes.

Built and tested RESTful APIs, including implementation of controllers and endpoints.

Gained exposure to backend system design and microservices-based architecture.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative pl-8 border-l border-zinc-800"
                    >
                        <div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[6.5px] top-1.5 ring-4 ring-zinc-950"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">Network Engineer Intern (Virtual Internship)</h3>
                            <span className="text-sm text-zinc-500">Jul 2024 – Sep 2024</span>
                        </div>
                        <p className="text-blue-400 text-sm mb-3">Zscaler (AICTE Collaboration) | Remote</p>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Learned core concepts of computer networks, including TCP/IP, routing, and network architecture.

Gained hands-on understanding of firewalls, VPNs, and cloud security solutions.

Studied and applied Zero Trust Architecture for securing enterprise systems.

Explored Secure Access Service Edge (SASE) and its role in modern cloud-based security.

Completed virtual labs simulating secure connectivity, firewall configuration, and traffic monitoring.

Developed foundational knowledge in network security and cloud infrastructure.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
