import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore';
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Offers() {
    const [listing, setlisting] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null);

    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                //Get Reference
                const listingsRef = collection(db, 'listings');

                //Create a Query
                const q = query(listingsRef, 
                    where('offer', '==', true),
                    orderBy('timestamp', 'desc'), 
                    limit(10));

                //execute the query
                const querySnap =  await getDocs(q);

                const lastVisible = querySnap.docs[querySnap.docs.length-1]
                setLastFetchedListing(lastVisible)

                const listings = [];
                querySnap.forEach(doc => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })

                })
                setlisting(listings);
                setLoading(false);
            } catch (error) {
              console.log(error);
                toast.error('could not fetch listings');
            }
        }
        fetchListings();
    }, [])

    //Pagination / Load More
    const onFetchMoreListings = async () => {
        try {
            //Get Reference
            const listingsRef = collection(db, 'listings');

            //Create a Query
            const q = query(listingsRef, 
                where('offer', '==', true), 
                orderBy('timestamp', 'desc'), 
                startAfter(lastFetchedListing),
                limit(10));

            //execute the query
            const querySnap =  await getDocs(q);

            const lastVisible = querySnap.docs[querySnap.docs.length-1]
            setLastFetchedListing(lastVisible)

            const listings = [];
            querySnap.forEach(doc => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })

            })
            setlisting((prev) => {
                return [...prev, ...listings]
            });
            setLoading(false);
        } catch (error) {
            toast.error('could not fetch listings');
        }
    }

  return <div className='category'>
      <header>
          <p className="pageHeader">
            Offers
          </p>
      </header>
      {loading ? <Spinner /> : listing && listing.length > 0 ? <>
        <main>
            <ul className='categoryListings'>
                {listing.map(listing => {
                    return <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                })}
            </ul>
        </main>
        <br />
        <br />
        {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings }>Load More</p>
        )}
      </> 
        : <p>There are no current offers</p>}
  </div>
}

export default Offers;