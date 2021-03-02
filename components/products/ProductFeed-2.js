export const ProductFeed = ({ cols = 2, children }) => {
	return (
		<div className={`grid lg:grid-cols-${cols} grid-cols-1 gap-5 `}>
			{children}
		</div>
	);
};
