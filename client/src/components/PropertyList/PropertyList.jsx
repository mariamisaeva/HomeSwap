import React, { useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import useFetch from "../../hooks/useFetch";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const PropertyList = () => {
  const {
    properties,
    setProperties,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    params,
  } = useLogin();
  // fetches all properties on first render with empty parameters, when parameters are updated (in Search component) it starts fetching WITH params included
  const { isLoading, error, performFetch } = useFetch(
    `/property/get?page=${currentPage}&${params}`,
    onDataReceived,
  );

  useEffect(() => {
    performFetch();
  }, [currentPage]);

  function onDataReceived(data) {
    setProperties(data.data);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
  }

  // set current page to be whichever number is clicked on
  const handlePagination = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPagesToArray = () => {
    const pageNumberList = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumberList.push(i);
    }
    return pageNumberList;
  };

  const pageList = totalPagesToArray(); // get array results that totalPagesToArray returns so it can be mapped through

  // create a btn for each number from the pageList array and show ellipsis after 2nd page followed by the last page number (e.g. |1| |2| |...| |5| |Next| )
  // or if in the last page |Prev| |1| |...| |4| |5| -- shows first page, ellipsis and 2 pages
  const pagination = pageList?.map((n) => {
    if (
      n === 1 ||
      n === totalPages ||
      (n >= currentPage - 1 && n <= currentPage + 1)
    ) {
      return (
        <button
          key={n}
          onClick={handlePagination}
          className={`pagination-btn btn-default ${currentPage === n ? "active" : ""}`}
        >
          {n}
        </button>
      );
    } else if (n === 2) {
      return (
        <span key="start-ellipsis" className="pagination-btn btn-default">
          ...
        </span>
      );
    } else if (n === totalPages - 1) {
      return (
        <span key="end-ellipsis" className="pagination-btn btn-default">
          ...
        </span>
      );
    }
  });

  const renderPropertyCards = () => {
    return properties?.map((property) => (
      <PropertyCard key={property._id} property={property} />
    ));
  };

  return (
    <section className="property-list-section">
      <h2 className="header">Available Homes</h2>
      {isLoading ? (
        <p className="header">Loading...</p>
      ) : error ? (
        <p className="header">There was a problem loading the data</p>
      ) : (
        <>
          <div className="property-card-container">{renderPropertyCards()}</div>
          <div className="pagination-container">
            {totalPages > 1 && (
              <div>
                {currentPage > 1 && (
                  <button
                    onClick={handlePrev}
                    className="pagination-btn btn-default"
                  >
                    Prev
                  </button>
                )}
                {pagination}
                {currentPage !== totalPages && (
                  <button
                    onClick={handleNext}
                    className="pagination-btn btn-default"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default PropertyList;
