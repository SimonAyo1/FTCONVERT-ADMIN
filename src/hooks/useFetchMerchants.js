import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../firebase-config';

const useFetchMerchants = (type) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNoUser, setIsNoUser] = useState(false);
  const [USERLIST, setUserList] = useState([]);

  const fetchAllMerchants = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, 'users'))
    if (querySnapshot.empty) {
      setIsNoUser(true);
      setIsLoading(false)
    }
    querySnapshot.forEach((doc) => {
      setIsLoading(false);
      // doc.data() is never undefined for query doc snapshots
     
      setUserList((e) => [
        ...e,
        {
          balance: doc.data().balance,
          company: doc.data().company,
          customer: doc.data().customer,
          email: doc.data().email,
          paymentUrl: doc.data().paymentUrl,
          userId: doc.data().userId,
          dId: doc.id,
          isDisabled: doc.data().isDisabled,
        },
      ]);
    });
  };

  useEffect(() => {
    fetchAllMerchants();
  }, []);
  return { isLoading, isNoUser, USERLIST };
};
export default useFetchMerchants;
