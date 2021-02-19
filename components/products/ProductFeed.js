export const ProductFeed = ({ cols = 2, children }) => {
	return (
		<div className={`grid md:grid-cols-${cols} grid-cols-1 gap-5 `}>
			{children}
		</div>
	);
};
