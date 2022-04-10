import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { getData } from '../app/data';
// import { GetServerSideProps } from '../Api/get';
// import daoList from '../Api/daoList.json';
import Tables from '../components/table';
import Loading from '../components/loading';
import { daoThunks } from '../app/daoSlice';
import Banner from '../components/Banners';
import Tags from '../components/Tags';
// import Banner from '../Assets/banner.png'
export default function HomePage() {
  const dispatch = useDispatch();
  const overviewState = useSelector((state) => state.dao.overviews);
  const isLoading = useSelector((state) => state.ui.pageLoading);
  useEffect(() => {
    dispatch(daoThunks.getOverviews());
  }, [dispatch]);

  console.log(overviewState);
  //fetch daos
  //loading state when loading
  //display table after data fetched
  // const [loading, setLoading] = useState(false);
  return <div>{isLoading ? <Loading /> :
  <div>
     <Tables data={overviewState} />

     <div>
       <Banner/>
     </div>
  </div> 
 }</div>;
}
