const Home = ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	return (
		<div>
			<div>home</div>
			<div>{searchParams["title"]}</div>
			<div>{searchParams["years"]}</div>
			<div>{searchParams["degree"]}</div>
			<div>{searchParams["country"]}</div>
			<div>{searchParams["skills"]}</div>
		</div>
	);
};

export default Home;
