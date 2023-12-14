import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../../styles/shelterdetail.scoped.css';
import '../../styles/listings.scoped.css';
import PetCard from '../shared/PetCard';
import ShelterReviews from './ShelterReviews';
import { shelterAPIService } from '../../services/userAPIService';
import { petAPIService } from '../../services/petAPIService';
import PetCardManager from '../shared/PetCardManager';
import { Link } from 'react-router-dom';

function ShelterDetail() {
  const { shelterId } = useParams();
  
  const [data, setData] = useState({})

  const API = shelterAPIService()

  const [manageFlag, setManageFlag] = useState(false)

  const petRenderFunc = (x) => {return <PetCard key={x.id} petId={x.id} data={x} manageFlag={manageFlag}/>}

  useEffect(() => {
    console.log("Hi")
    API.getShelterDetail(shelterId).then(ret => {
      console.log(ret)
      if (ret.success) {
        setData(ret.data)
      }
    })
    if (localStorage.getItem("user_type")=='petshelter' && localStorage.getItem("user_object_id") == shelterId) {
      setManageFlag(true)
    }
  }, [])
  console.log(data)
  return (
    <div className="shelterdetail-main min-vh-100">
      {/* Shelter details content */}
      <div className="text-center my-4 mx-auto">
        <h1 className="d-inline-block position-relative">{data.name}</h1>
      </div>

      <div className="mx-3 mx-md-5">
        <div className="d-flex justify-content-center mb-10">
          <div className="col-12 col-md-8 px-4 py-2 mb-4">
            <h1 className="m-0">{data.mission}</h1>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center">
          <div className="col-12 col-xl-7 col-xxl-8 pe-xl-4 mb-2 d-flex flex-column justify-content-between">
            <div className="border rounded px-4 py-2 mb-4 flex-expand">
              <h2>About Us</h2>
              <p className="text-center mb-0">
                {data.about_us}
              </p>
            </div>
            <div className="border rounded px-2 px-xl-4 py-4">
              <div className="text-center mb-4 mx-auto">
                <h2 className="d-inline-block position-relative mb-0">Pets</h2>
              </div>

              <div className="pet-container d-flex flex-wrap flex-column flex-sm-row justify-content-between">
                {/* Sample pet cards */}
                <PetCardManager filters={{shelter: shelterId, page_size: 3}} render={petRenderFunc}/>
                {/* Repeat similar blocks for additional pets */}
              </div>
              <div className="d-flex justify-content-end mt-3 px-2 px-xl-4 py-2 py-sm-0">
                <Link className="text-end" to="/pets/" state={{defaultFilters:{shelter: shelterId}}}>View All</Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8 col-xl-5 col-xxl-4 mb-2">
            <div className="border rounded-top py-2">
              <h2 className="text-center">Contact Information</h2>
              <p className="text-center mb-0"><span style={{ fontWeight: 'bold' }}>Email: </span>{data.account?.email}</p>
              <p className="text-center mb-0"><span style={{ fontWeight: 'bold' }}>Phone: </span>{data.phone_num}</p>
            </div>
            <div className="border py-2">
              <h2 className="text-center">Location</h2>
              <p className="text-center mb-0">{data.location}</p>
              {/* You may add a map integration here */}
            </div>
            <div className="border rounded-bottom py-2">
              <h2 className="text-center">Reviews</h2>
              <ShelterReviews id={shelterId} account_id={data.account?.id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShelterDetail;