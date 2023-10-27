import Image from 'next/image'
import FooterColumn from '@/components/FooterColumn'
import { footerLinks } from '@/constant'

const Footer = () => {
  return (
    <footer className='flex items-center justify-start flex-col gap-4 w-full text-sm lg:px-20 py-6 px-5'>
      <div className='flex flex-col gap-12 w-full'>
      <div className='flex flex-col items-start'>
        <Image 
        src="/logo-purple.svg"
        width={115}
        height={38}
        alt='Flexibble'
        />
        <p className='text-sm text-start mt-5 max-w-xs'>
          Flexibble is the world's leading community for creatives to share, grow and get hired.
        </p>
      </div>
      <div className='flex flex-wrap gap-12'>
        <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links}/>
        
        <div className='flex flex-1 flex-col gap-4'>
          <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links}/>
          <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links}/>
        </div>
        <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links}/>
        <div className='flex flex-1 flex-col gap-4'>
          <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links}/>
          <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links}/>
        </div>
          <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links}/>
        
      </div>
      </div>

      <div className='flex items-center justify-evenly max-sm:flex-col w-full text-sm'>
        <p>&copy; 2023 Flexibble. All rights reserved.</p>
        <p className='text-gray'>
          <span className='text-black font-semibold'>10,214 </span>
          Projects Submitted
        </p>
      </div>
    </footer>
  )
}

export default Footer