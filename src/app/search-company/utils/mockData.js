// Dữ liệu mẫu cho các thành phố/tỉnh
export const locations = [
  { city_id: 1, city_name: 'Hồ Chí Minh' },
  { city_id: 2, city_name: 'Hà Nội' },
  { city_id: 3, city_name: 'Đà Nẵng' },
  { city_id: 4, city_name: 'Cần Thơ' },
  { city_id: 5, city_name: 'Bình Dương' },
  { city_id: 6, city_name: 'Đồng Nai' },
];

// Dữ liệu mẫu cho các quận/huyện
export const wards = [
  { ward_id: 1, ward_name: 'Quận 1', city_id: 1 },
  { ward_id: 2, ward_name: 'Quận 2', city_id: 1 },
  { ward_id: 3, ward_name: 'Quận 3', city_id: 1 },
  { ward_id: 4, ward_name: 'Quận Cầu Giấy', city_id: 2 },
  { ward_id: 5, ward_name: 'Quận Ba Đình', city_id: 2 },
  { ward_id: 6, ward_name: 'Quận Hai Bà Trưng', city_id: 2 },
  { ward_id: 7, ward_name: 'Quận Hải Châu', city_id: 3 },
  { ward_id: 8, ward_name: 'Quận Thanh Khê', city_id: 3 },
];

// Dữ liệu mẫu cho các danh mục công việc
export const categories = [
  { cate_id: 1, cate_name: 'IT - Phần mềm' },
  { cate_id: 2, cate_name: 'Marketing' },
  { cate_id: 3, cate_name: 'Kế toán - Tài chính' },
  { cate_id: 4, cate_name: 'Thiết kế' },
  { cate_id: 5, cate_name: 'Giáo dục' },
  { cate_id: 6, cate_name: 'Bán hàng' },
];

// Dữ liệu mẫu cho các cấp độ công việc
export const levels = [
  { level_id: 1, level_name: 'Thực tập sinh' },
  { level_id: 2, level_name: 'Nhân viên' },
  { level_id: 3, level_name: 'Trưởng nhóm' },
  { level_id: 4, level_name: 'Quản lý' },
  { level_id: 5, level_name: 'Giám đốc' },
];

// Dữ liệu mẫu cho loại hình công việc
export const workTypes = [
  { work_type_id: 1, work_type_name: 'Toàn thời gian' },
  { work_type_id: 2, work_type_name: 'Bán thời gian' },
  { work_type_id: 3, work_type_name: 'Làm từ xa' },
  { work_type_id: 4, work_type_name: 'Theo dự án' },
];

// Dữ liệu mẫu cho các chuyên ngành
export const majors = [
  { major_id: 1, major_name: 'Kỹ thuật phần mềm' },
  { major_id: 2, major_name: 'Khoa học máy tính' },
  { major_id: 3, major_name: 'Marketing' },
  { major_id: 4, major_name: 'Tài chính - Ngân hàng' },
  { major_id: 5, major_name: 'Thiết kế đồ họa' },
];

// Dữ liệu mẫu cho công ty phổ biến (sử dụng cho phần Popular Searches)
export const popularCompanies = [
  { id: 1, name: 'FPT Software' },
  { id: 2, name: 'VNG Corporation' },
  { id: 3, name: 'Momo' },
  { id: 4, name: 'Tiki' }
];

// Dữ liệu mẫu cho các công ty
export const companies = [
  {
    company_id: 1,
    user_id: 101,
    name: 'FPT Software',
    logo: '/public/file.svg',
    description: 'FPT Software là công ty phần mềm hàng đầu Việt Nam với hơn 20.000 nhân viên trên toàn thế giới.',
    email: 'careers@fpt.com.vn',
    address: 'Tòa nhà FPT, Phạm Hùng, Quận 7',
    quantity_employee: '10000+',
    status: 'active',
    location: 'Hồ Chí Minh',
    city_id: 1,
    ward_id: 1,
    industry: 'IT - Phần mềm',
    founding_year: 1999,
    website: 'https://fptsoftware.com',
    benefits: ['Bảo hiểm sức khỏe', 'Đào tạo chuyên sâu', 'Môi trường quốc tế'],
    job_count: 24
  },
  {
    company_id: 2,
    user_id: 102,
    name: 'VNG Corporation',
    logo: '/public/globe.svg',
    description: 'VNG là công ty công nghệ hàng đầu Việt Nam, tiên phong trong các lĩnh vực trò chơi trực tuyến, nền tảng kết nối, thanh toán điện tử và dịch vụ điện toán đám mây.',
    email: 'hr@vng.com.vn',
    address: 'Tòa nhà VNG, Quận 7',
    quantity_employee: '5000+',
    status: 'active',
    location: 'Hồ Chí Minh',
    city_id: 1,
    ward_id: 2,
    industry: 'IT - Phần mềm',
    founding_year: 2004,
    website: 'https://vng.com.vn',
    benefits: ['Bảo hiểm sức khỏe', 'Thưởng hiệu suất', 'Team building'],
    job_count: 18
  },
  {
    company_id: 3,
    user_id: 103,
    name: 'Momo',
    logo: '/public/window.svg',
    description: 'MoMo là ví điện tử hàng đầu Việt Nam với hơn 20 triệu người dùng, cung cấp các dịch vụ thanh toán trực tuyến, chuyển tiền và mua sắm.',
    email: 'careers@momo.vn',
    address: 'Tầng 6, Tòa nhà Phú Mỹ Hưng, Quận 7',
    quantity_employee: '1000+',
    status: 'active',
    location: 'Hồ Chí Minh',
    city_id: 1,
    ward_id: 3,
    industry: 'Fintech',
    founding_year: 2013,
    website: 'https://momo.vn',
    benefits: ['Môi trường năng động', 'Cơ hội học tập', 'Thưởng thâm niên'],
    job_count: 12
  },
  {
    company_id: 4,
    user_id: 104,
    name: 'Tiki',
    logo: '/public/file.svg',
    description: 'Tiki là sàn thương mại điện tử hàng đầu Việt Nam, cung cấp hàng triệu sản phẩm từ sách đến điện tử, thời trang và nhu yếu phẩm.',
    email: 'careers@tiki.vn',
    address: 'Tòa nhà Viettel, Quận 10',
    quantity_employee: '3000+',
    status: 'active',
    location: 'Hồ Chí Minh',
    city_id: 1,
    ward_id: 1,
    industry: 'E-commerce',
    founding_year: 2010,
    website: 'https://tiki.vn',
    benefits: ['Chế độ bảo hiểm tốt', 'Đào tạo chuyên môn', 'Môi trường startup'],
    job_count: 15
  },
  {
    company_id: 5,
    user_id: 105,
    name: 'Naver Vietnam',
    logo: '/public/globe.svg',
    description: 'Naver là công ty Internet hàng đầu Hàn Quốc. Naver Vietnam phát triển các sản phẩm công nghệ cho thị trường toàn cầu.',
    email: 'hr@navercorp.com',
    address: 'Keangnam Hanoi Landmark Tower, Phạm Hùng',
    quantity_employee: '500+',
    status: 'active',
    location: 'Hà Nội',
    city_id: 2,
    ward_id: 4,
    industry: 'IT - Phần mềm',
    founding_year: 2019,
    website: 'https://navercorp.com',
    benefits: ['Lương cạnh tranh', 'Môi trường quốc tế', 'Cơ hội đi nước ngoài'],
    job_count: 8
  },
  {
    company_id: 6,
    user_id: 106,
    name: 'VinFast',
    logo: '/public/window.svg',
    description: 'VinFast là công ty sản xuất ô tô, xe máy điện và xe buýt điện thuộc Tập đoàn Vingroup, với tầm nhìn trở thành thương hiệu xe điện toàn cầu.',
    email: 'recruitment@vinfast.vn',
    address: 'Tòa nhà Exchange Tower, Quận 1',
    quantity_employee: '7000+',
    status: 'active',
    location: 'Hà Nội',
    city_id: 2, 
    ward_id: 5,
    industry: 'Ô tô - Xe máy',
    founding_year: 2017,
    website: 'https://vinfast.vn',
    benefits: ['Chế độ đãi ngộ tốt', 'Cơ hội phát triển', 'Môi trường chuyên nghiệp'],
    job_count: 20
  },
  {
    company_id: 7,
    user_id: 107,
    name: 'Grab Vietnam',
    logo: '/public/file.svg',
    description: 'Grab là nền tảng đặt xe, giao hàng và thanh toán di động hàng đầu Đông Nam Á, mang đến giải pháp vận chuyển, ăn uống và thanh toán tiện lợi.',
    email: 'careers.vietnam@grab.com',
    address: 'Mapletree Business Centre, Quận 7',
    quantity_employee: '2000+',
    status: 'active',
    location: 'Hồ Chí Minh',
    city_id: 1,
    ward_id: 2,
    industry: 'Công nghệ - Giao thông',
    founding_year: 2014,
    website: 'https://grab.com/vn',
    benefits: ['Môi trường quốc tế', 'Chế độ bảo hiểm', 'Lương thưởng hấp dẫn'],
    job_count: 14
  },
  {
    company_id: 8,
    user_id: 108,
    name: 'Shopee',
    logo: '/public/globe.svg',
    description: 'Shopee là nền tảng thương mại điện tử hàng đầu Đông Nam Á và Đài Loan, cung cấp trải nghiệm mua sắm trực tuyến dễ dàng, an toàn và nhanh chóng.',
    email: 'careers@shopee.com',
    address: 'Tòa nhà Lim Tower, Quận 1',
    quantity_employee: '4000+',
    status: 'active',
    location: 'Hồ Chí Minh',
    city_id: 1,
    ward_id: 1,
    industry: 'E-commerce',
    founding_year: 2015,
    website: 'https://shopee.vn',
    benefits: ['Văn hóa công ty tốt', 'Đào tạo liên tục', 'Phúc lợi đa dạng'],
    job_count: 17
  },
  {
    company_id: 9,
    user_id: 109,
    name: 'KMS Technology',
    logo: '/public/window.svg',
    description: 'KMS Technology là công ty phát triển phần mềm và kiểm thử phần mềm, cung cấp các dịch vụ chất lượng cao cho khách hàng quốc tế.',
    email: 'careers@kms-technology.com',
    address: 'Tòa nhà Centec, Quận 3',
    quantity_employee: '1500+',
    status: 'active',
    location: 'Hồ Chí Minh',
    city_id: 1,
    ward_id: 3,
    industry: 'IT - Phần mềm',
    founding_year: 2009,
    website: 'https://kms-technology.com',
    benefits: ['Chế độ làm việc linh hoạt', 'Đào tạo kỹ năng chuyên môn', 'Team building hàng quý'],
    job_count: 10
  },
  {
    company_id: 10,
    user_id: 110,
    name: 'TMA Solutions',
    logo: '/public/file.svg',
    description: 'TMA Solutions là công ty outsourcing phần mềm với 25 năm kinh nghiệm, phục vụ hơn 100 khách hàng từ 30 quốc gia.',
    email: 'hr@tma.com.vn',
    address: 'Quang Trung Software City, Quận 12',
    quantity_employee: '2500+',
    status: 'active',
    location: 'Hồ Chí Minh',
    city_id: 1,
    ward_id: 2,
    industry: 'IT - Phần mềm',
    founding_year: 1997,
    website: 'https://tmasolutions.com',
    benefits: ['Lương cạnh tranh', 'Cơ hội làm việc với công nghệ mới', 'Môi trường đa văn hóa'],
    job_count: 22
  }
];

// Dữ liệu mẫu cho công ty được đề xuất (đơn giản hóa từ danh sách trên)
export const recommendedCompanies = [
  {
    id: 1,
    name: 'Nomad',
    logo: '/public/file.svg',
    location: 'Paris, France',
    description: 'Nomad has generates $728,000 in sales (USD).',
    jobCount: 3,
    tags: []
  },
  {
    id: 2,
    name: 'Discord',
    logo: '/public/globe.svg',
    location: '',
    description: "We'd love to work with someone like you. We care about creating a delightful experience.",
    jobCount: 3,
    tags: []
  },
  {
    id: 3,
    name: 'Maze',
    logo: '/public/window.svg',
    location: '',
    description: "We're a passionate bunch working from all over the world to build the future of rapid testing together.",
    jobCount: 3,
    tags: []
  },
  {
    id: 4,
    name: 'Udacity',
    logo: '/public/file.svg',
    location: '',
    description: 'Udacity is a new type of online university that teaches the actual programming skills.',
    jobCount: 3,
    tags: []
  },
  {
    id: 5,
    name: 'Webflow',
    logo: '/public/globe.svg',
    location: '',
    description: 'Webflow is the first design and hosting platform built from the ground up for the mobile age.',
    jobCount: 3,
    tags: ['Technology']
  },
  {
    id: 6,
    name: 'Foundation',
    logo: '/public/window.svg',
    location: '',
    description: 'Foundation helps creators mint and auction their digital artworks as NFTs on the Ethereum blockchain.',
    jobCount: 3,
    tags: ['Crypto']
  }
];

// Dữ liệu mẫu cho các công ty theo danh mục (ví dụ: Công ty IT)
export const itCompanies = companies
  .filter(company => company.industry === 'IT - Phần mềm')
  .map(company => ({
    id: company.company_id,
    name: company.name,
    logo: company.logo,
    jobCount: company.job_count
  }));

// Dữ liệu mẫu cho các công ty thương mại điện tử
export const ecommerceCompanies = companies
  .filter(company => company.industry === 'E-commerce')
  .map(company => ({
    id: company.company_id,
    name: company.name,
    logo: company.logo,
    jobCount: company.job_count
  }));

// Data for design companies
export const designCompanies = [
  {
    id: 1,
    name: 'Pentagram',
    logo: '/logo_example.png',
    jobCount: 3
  },
  {
    id: 2,
    name: 'Wolff Olins',
    logo: '/logo_example.png',
    jobCount: 2
  },
  {
    id: 3,
    name: 'Clay',
    logo: '/logo_example.png',
    jobCount: 3
  },
  {
    id: 4,
    name: 'MediaMonks',
    logo: '/logo_example.png',
    jobCount: 3
  },
  {
    id: 5,
    name: 'Packer',
    logo: '/logo_example.png',
    jobCount: 3
  },
  {
    id: 6,
    name: 'Square',
    logo: '/logo_example.png',
    jobCount: 3
  },
  {
    id: 7,
    name: 'Divy',
    logo: '/logo_example.png',
    jobCount: 3
  },
  {
    id: 8,
    name: 'WebFlow',
    logo: '/logo_example.png',
    jobCount: 3
  }
];

// Sử dụng các ảnh có sẵn trong dự án để thay thế logo
export const companyLogosPlaceholder = {
  'FPT Software': '/public/file.svg',
  'VNG Corporation': '/public/globe.svg',
  'Momo': '/public/window.svg',
  'Tiki': '/public/file.svg',
  'Naver Vietnam': '/public/globe.svg',
  'VinFast': '/public/window.svg',
  'Grab Vietnam': '/public/file.svg',
  'Shopee': '/public/globe.svg',
  'KMS Technology': '/public/window.svg',
  'TMA Solutions': '/public/file.svg'
}; 