import useToggle from '@/hooks/useToggle';
import MoleculesFormVariant from '@/organisms/form/variant';
import {motion, AnimatePresence} from 'framer-motion';
import {Input} from 'posy-fnb-core';
import {AiOutlineDelete, AiOutlineDown} from 'react-icons/ai';

import AtomSwitch from '../../atoms/switch';

type AccordionProps = {
	index: number;
	expanded: number | false;
	setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
};

const Accordion = ({index, expanded, setExpanded}: AccordionProps) => {
	const {value: isRequired, toggle: handleIsRequired} = useToggle(false);
	const {value: isCanMultiple, toggle: handleIsCanMultiple} = useToggle(false);

	const isOpen = index === expanded;

	// By using `AnimatePresence` to mount and unmount the contents, we can animate
	// them in and out while also only rendering the contents of open accordions
	return (
		<div className="mb-3">
			<motion.span
				initial={false}
				onClick={() => setExpanded(isOpen ? false : index)}
			>
				<div className="flex items-center justify-between rounded-md border p-3">
					<span className="rounded-full border bg-red-500 p-2 text-l-medium text-white">
						<AiOutlineDelete />
					</span>
					<Input
						name="price_after_discount"
						labelText="Addon Name:"
						placeholder="ex: 5000"
						className="flex items-center justify-center"
					/>
					<span className="rounded-full border bg-slate-400 p-2 text-l-medium text-white">
						<AiOutlineDown />
					</span>
				</div>
			</motion.span>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.section
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={{
							open: {height: 'auto', scale: 1},
							collapsed: {height: 0, scale: 0},
						}}
						transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}
					>
						<motion.div
							variants={{collapsed: {scale: 0}, open: {scale: 1}}}
							transition={{duration: 0.8}}
							className="content-placeholder"
						>
							<div className="border p-3">
								<div className="flex justify-around gap-3">
									<div className="mb-6">
										<AtomSwitch
											name="Is Required"
											label="Required:"
											onChange={handleIsRequired}
											text={isRequired ? 'Yes' : 'No'}
										/>
									</div>
									<div className="mb-6">
										<AtomSwitch
											name="Is Can Multiple"
											label="Can Choose Multitple:"
											onChange={handleIsCanMultiple}
											text={isCanMultiple ? 'Yes' : 'No'}
										/>
									</div>
								</div>
								<MoleculesFormVariant />
							</div>
						</motion.div>
					</motion.section>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Accordion;
