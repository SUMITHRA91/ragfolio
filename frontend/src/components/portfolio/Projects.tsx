import { motion } from 'framer-motion'

export function Projects() {
  return (
    <section id="projects" className="py-12 px-4 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Project 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-white text-lg">
              AI-Based Student Loan Risk Prediction
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Built a Django-based loan management system with AI-driven risk classification.
              Implemented modules for loan application, approval, and repayment tracking,
              along with interest calculation and risk assessment features.
            </p>
            <p className="text-xs text-zinc-500 mt-3">
              Tech: Django, Python, Machine Learning
            </p>
          </motion.div>

          {/* Project 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-white text-lg">
              VitalAI – Healthcare Risk Prediction
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Developed a healthcare web application that predicts health risks using machine learning.
              Implemented ECG signal analysis to detect abnormal heart patterns and designed dashboards
              for monitoring patient insights.
            </p>
            <p className="text-xs text-zinc-500 mt-3">
              Tech: Python, ML, Django
            </p>
          </motion.div>

          {/* Project 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-white text-lg">
              SHE – Women Safety Application
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Built a Django-based women safety system with SOS alerts and live location sharing.
              Implemented role-based authentication and emergency contact notifications,
              ensuring secure handling of user safety data.
            </p>
            <p className="text-xs text-zinc-500 mt-3">
              Tech: Django, Python, Google Maps API
            </p>
          </motion.div>

          {/* Project 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <h3 className="font-medium text-white text-lg">
              AI-Based Career Guidance Portal
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Developed a career guidance platform providing personalized recommendations using AI logic.
              Implemented skill gap analysis, resume suggestions, and structured learning paths
              for students.
            </p>
            <p className="text-xs text-zinc-500 mt-3">
              Tech: Django, Python, AI Logic
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}