import { KeyboardArrowUpRounded } from '@material-ui/icons';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './CountriesTable.module.css';

const orderBy=(countries,value,direction)=>{
    if(direction=='asc')
   { return [...countries].sort((a,b)=>
      (a[value]>b[value] ? 1 : -1));
    }

    if(direction=='desc')
    { return [...countries].sort((a,b)=>
        (a[value]>b[value] ? -1 : 1));
    }

    return countries;

   
};

const SortArrow=({direction})=>{
    if(!direction)
    {
        return <></>;
    }

    if(direction=="desc")
    {
        return(
            <div className={styles.heading_arrow}>
                <KeyboardArrowDownRounded color="inherit"/>
            </div>
        );
    }else {
        return(
            <div className={styles.heading_arrow}>
                <KeyboardArrowUpRounded color="inherit"/>
            </div>
        )
    }
};

const CountriesTable=({countries})=>{

    const [direction,setDirection]=useState(null);
    const [value,setValue]=useState();

   var orderdCountries=orderBy(countries,value,direction);

   const setValueAndDirection = (value) => {
     if(!direction){
         setDirection('desc');
         setValue(value)
     }else if(direction==="desc")
     {
         setDirection("asc");
         setValue(value);
     }  
     else {
         setValue(value);
         setDirection(null);
        }
   }

 
   return(
    <div>
      
       <div className={styles.heading}>
        
           <div className={styles.heading_flag}></div>
       
           <button className={styles.heading_name} onClick={()=>setValueAndDirection("name")} >
               
               <div>name</div>
               { value==="name" && <SortArrow direction={direction} /> }

           </button>

           <button className={styles.heading_population} onClick={()=>setValueAndDirection("population")}>
              
               <div>Population</div>
               { value==="population" && <SortArrow direction={direction}/> }

           </button>
      
           <button className={styles.heading_area} onClick={()=>setValueAndDirection("area")}>
              
               <div>Area (Km<sup style={{fontSize:8}}>2</sup>)</div>
               { value==="area" && <SortArrow direction={direction}/> }

           </button>
      
           <button className={styles.heading_gini} onClick={()=>setValueAndDirection("gini")}>
              
               <div>Gini</div>

               {
                   value==="gini" && <SortArrow direction={direction}/>
               }

           </button>
      
       </div>

        {
            orderdCountries.map((country)=>{
              return( 
                <Link href={`/country/${country.alpha3Code}`} key={country.name}>
                 
                  <div className={styles.row}>
                    
                    
                    <div className={styles.flag}> 
                        <Image width="60%" height="40%" quality="20" objectFit="cover" layout="fixed" src={country.flag} alt={country.name} />
                    </div>

                    <div className={styles.name}>
                        {country.name}
                    </div>
                   
                    <div className={styles.population}>
                        {country.population}
                    </div>

                    <div className={styles.area}>
                        {country.area || 0}
                    </div>

                    <div className={styles.gini}>
                        {country.gini || 0}%
                    </div>

                  </div>
                  
                </Link>  
                )
            })
        }

    </div>
   )
}
export default CountriesTable;