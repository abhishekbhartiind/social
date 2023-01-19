import Layout from "../components/Layout";
import withApollo from "../utils/withApollo";

const Index = () => {
    return (
        <Layout home>
            <div>Home</div>
        </Layout>
    );
}

export default withApollo({ ssr: true })(Index);
