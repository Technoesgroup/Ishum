import { motion } from "framer-motion";
import Comp1 from "../Component/Landing/LandingCom1";
import Comp2 from "../Component/Landing/LandingCom2";
import Comp3 from "../Component/Landing/LandingCom3";
import Comp4 from "../Component/Landing/LandingCom4";
import Comp5 from "../Component/Landing/LandingCom5";
import Comp6 from "../Component/Landing/LandingCom6";
import Comp7 from "../Component/Landing/LandingCom7";
import Comp8 from "../Component/Landing/LandingCom8";
import Comp9 from "../Component/Landing/LandingCom9";

const Landing = () => {

  const fadeInUp = {
    hidden: { opacity: 0, y: 130 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
      <div className="Landing-Components">
       
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp1 />
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp2 />
        </motion.div>


        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp3 />
        </motion.div>


        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp4 />
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp5 />
        </motion.div>

        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp6 />
        </motion.div>



        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp9 />
        </motion.div>
        
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp7 />
        </motion.div>

        
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Comp8 />
        </motion.div>

      </div>
  );
};

export default Landing;