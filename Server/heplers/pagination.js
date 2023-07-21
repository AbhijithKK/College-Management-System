

const Pagination=async(pages,modules)=>{
        let page=pages
        let limit=page*5
        let skip=(page-1)*5
        let total=await modules.countDocuments()
        total=Math.ceil(total/5)
        return {limit,skip,total}
}
module.exports={Pagination}