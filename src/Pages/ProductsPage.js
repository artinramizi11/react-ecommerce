import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Product from '../Components/Product'
import { usePageContext } from '../context/PageContext'
import Categories from '../Components/Categories'

const ProductsPage = () => {

  const {pageNumber,categoryName} = useParams()
  const {products,search,price} = usePageContext()
  const [currentPage,setCurrentPage] = useState(1)
  const [pageSize,setPageSize] = useState(7)

   const paginationProducts = useMemo(() => {

    return products?.slice((currentPage - 1) * pageSize, currentPage * pageSize).filter((product) => {
      const searchByPrice = price ? product.price >= price : true
      const searchByName = product.name.toLowerCase().includes(search.toLowerCase())
      return searchByName && searchByPrice
    })

    },[products,currentPage,pageSize,search,price])

    const totalPages = Math.ceil(products?.length / pageSize);

    useEffect(() => {
      if(pageNumber) {
        setCurrentPage(Number(pageNumber))
      } else {
        setCurrentPage(1)
      }

    },[pageNumber])


    return (
      <>
        <Categories />
        {paginationProducts.length > 0 && <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
          {paginationProducts?.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <Product product={product} />
            </div>
          ))}
        </div>}

        {paginationProducts.length === 0 && 
        <>
        <p 
            className='text-center w-full h-[300px] flex items-center justify-center bg-gray-200'>
              No Products Found For <span className='underline p-2'>{search}</span><span className='m-2'>value</span> on {currentPage} page {price && `and with ${price}$ price`}
              </p>
        </>
          }
    
        <div className="flex justify-center items-center gap-3 m-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link 
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-12 h-12 flex items-center justify-center font-bold   
                ${index + 1 === currentPage 
                  ? "bg-slate-600 text-white" 
                  : "bg-gray-300 text-white-800 hover:bg-slate-600 hover:text-white"}
              `}
              to={`/page/${index + 1}`}
            >
              {index + 1}
            </Link>
          ))}
        </div>
      </>
    );
    
}

export default ProductsPage;


