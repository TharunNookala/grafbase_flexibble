import Link from 'next/link'

type ColumnProps = {
  title : string;
  links : Array<string>;
}

const FooterColumn = ({title, links} : ColumnProps) => {
  return (
    <div className='flex flex-1 flex-col gap-3 text-sm min-w-max'>
        <h4 className='font-semibold'>{title}</h4>
        <ul className='flex flex-col gap-2 font-normal'>
            {links.map(link =>(
              <Link href='/' key={link}>{link}</Link>
            ))}
        </ul>
    </div>
  )
}

export default FooterColumn