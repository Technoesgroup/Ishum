import { motion } from "framer-motion";
import Comp1 from "../Component/IshumExclusive/IshumExclusiveCom1";
import Comp2 from "../Component/IshumExclusive/IshumExclusive";
const Exclusive = () => {

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

     
      </div>
  );
};

export default Exclusive;