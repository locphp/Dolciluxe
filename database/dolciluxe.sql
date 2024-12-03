CREATE TABLE `tbl_customer` (
    `cust_id` int(11) NOT NULL AUTO_INCREMENT,
    `cust_name` varchar(100) NOT NULL,
    `cust_email` varchar(100) NOT NULL,
    `cust_phone` varchar(50) NOT NULL,
    `cust_address` text NOT NULL,
    `cust_district` varchar(100) NOT NULL,
    `cust_province` varchar(100) NOT NULL,
    `cust_password` varchar(100) NOT NULL,
    `cust_token` varchar(255) NOT NULL,
    `cust_datetime` varchar(100) NOT NULL,
    `cust_timestamp` varchar(100) NOT NULL,
    `cust_status` int(1) NOT NULL,
    PRIMARY KEY (`cust_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(255) NOT NULL,
    PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tbl_category` (`cat_id`, `cat_name`) VALUES
(1, 'Bánh sinh nhật'),
(2, 'Bánh truyền thống'),
(3, 'Cookie & MiniCake'),
(4, 'Bánh mì & Bánh khác');

CREATE TABLE `tbl_product` (
    `p_id` int(11) NOT NULL AUTO_INCREMENT,
    `p_name` varchar(255) NOT NULL,
    `p_old_price` varchar(10) NOT NULL,
    `p_current_price` varchar(10) NOT NULL,
    `p_qty` int(10) NOT NULL,
    `p_featured_photo` varchar(255) NOT NULL,
    `p_description` text NOT NULL,
    `p_is_active` int(1) NOT NULL,
    `cat_id` int(11) NOT NULL,
    PRIMARY KEY (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tbl_product` (`p_id`,`p_name`,`p_old_price`,`p_current_price`,`p_qty`,`p_featured_photo`,`p_description`,`p_is_active`,`cat_id`)
VALUES
(30,'Bánh kem cam sữa chua mật ong','222000','189000',29,'bdc_1.jpg','Bánh kem cam sữa chua mật ong là sự kết hợp hoàn hảo giữa vị chua thanh của sữa chua, ngọt dịu của mật ong và hương thơm tươi mát từ cam. Lớp bánh mềm mại được phủ kem mịn màng, mang đến cảm giác vừa béo ngậy, vừa tươi mới',1,1),
(31,'Bánh kem tiramisu','163000','139000',26,'bdc_2.jpg','Sự kết hợp hoàn hảo giữa lớp bánh ladyfinger thấm đẫm cà phê đậm đà, xen lẫn lớp kem mascarpone béo ngậy, nhẹ nhàng và hương rượu rum thơm nồng.',1,1),
(32,'Bánh Passion Mousse Cheesecake','344000','292000',37,'bdc_3.jpg','Bánh Passion Mousse Cheesecake là sự kết hợp tuyệt vời giữa vị chua ngọt của chanh dây và vị béo ngậy của phô mai hòa cùng lớp mouse mịn màng tan chảy bên trong lớp cheesecake mềm mại và đế bánh giòn rụm.',1,1),
(33,'Bánh Red Velvet Mousse Cheesecake','372000','316000',14,'bdc_4.jpg','Bánh Red Velvet Mousse Cheesecake là sự pha trộn hoàn hảo giữa lớp bánh red velvet mềm mịn, vị cacao nhẹ nhàng và sắc đỏ quyến rũ, cùng lớp mousse phô mai béo ngậy, mịn màng. Tầng bánh được phủ kem phô mai tươi thanh ngọt, tạo nên sự cân bằng tinh tế giữa vị ngọt và vị béo.',1,1),
(34,'Bánh Chocolate Mousse Cheesecake','201000','171000',28,'bdc_5.jpg','Bánh Chocolate Mousse Cheesecake là sự hòa quyện tuyệt vời giữa lớp đế cheesecake phô mai thơm béo và mousse chocolate mềm mịn, đậm đà. Hương vị cacao nồng nàn trong từng lớp mousse tan chảy, kết hợp với độ mịn của kem phô mai, tạo nên trải nghiệm vừa ngọt ngào vừa thanh tao.',1,1),
(35,'Bánh kem khoai môn','318000','270000',23,'bdc_6.jpg','Mỗi miếng bánh là sự kết hợp giữa độ mềm của bánh, vị béo của kem, và vị bùi tự nhiên của khoai môn, đem lại cảm giác thanh nhã và ngọt ngào, rất phù hợp cho những dịp sum họp gia đình hoặc lễ kỷ niệm',1,1),
(36,'Bánh kem nhân thơm','394000','335000',18,'bdc_7.jpg','Lớp bánh mềm mịn xen kẽ với phần nhân thơm tươi mát, mang lại cảm giác thanh thoát và dễ chịu. Mỗi miếng bánh là sự hòa quyện của hương vị tươi mới từ trái thơm và độ mịn màng từ kem, tạo nên trải nghiệm sảng khoái và hấp dẫn, lý tưởng cho những buổi tiệc hay dịp đặc biệt',1,1),
(37,'Bánh kem nhân dâu','386000','328000',18,'bdc_8.jpg','Bánh kem nhân dâu mang hương vị ngọt ngào, tươi mới của những trái dâu mọng nước, kết hợp với lớp kem tươi mịn màng',1,1),
(38,'Bánh Tiramisu Mâm Xôi','268000','228000',32,'bdc_9.jpg','Ladyfinger thấm đẫm cà phê nồng nàn, xen lẫn với nhân kem mềm mại và những quả mâm xôi mọng nước, tạo nên sự cân bằng hoàn hảo giữa vị ngọt, béo và chua thanh.',1,1),
(39,'Bánh ốp la','126000','107000',13,'bdc_10.jpg','Bánh cheesecake không nướng với kem phô mai, sốt trứng muối, sốt chanh, bánh mirliton không gluten',1,1),
(40,'Bánh kem 6 lớp chuối','273000','232000',17,'bdc_11.jpg','Bề mặt bánh có thể được trang trí thêm bằng lát chuối tươi, sô-cô-la hoặc caramel, tạo nên một món bánh thơm ngon, mềm mại và hấp dẫn cả về thị giác lẫn vị giác',1,1),
(41,'Bánh kem hạt phỉ','173000','147000',11,'bdc_12.jpg','Bánh kem hạt phỉ là một món tráng miệng thơm ngon với sự kết hợp hoàn hảo giữa vị béo bùi của hạt phỉ và kem mềm mịn. Phần cốt bánh thường là bánh bông lan hoặc bánh sô-cô-la, xen kẽ với lớp kem hạt phỉ thơm lừng',1,1),
(42,'Bánh kem trà xanh dâu latte','282000','240000',12,'bdc_13.jpg','Bánh kem trà xanh dâu latte là sự kết hợp độc đáo giữa hương vị thanh mát của trà xanh và sự ngọt ngào của dâu tây, thêm chút béo ngậy từ kem latte. Lớp cốt bánh mềm mịn thường được pha với bột trà xanh, mang đến màu xanh dịu mắt và vị chát nhẹ, cân bằng với những lớp kem thơm mịn có vị dâu tươi và latte.',1,1),
(43,'Bánh Kem Trà Bá Tước, quả Lý Chua Đen','103000','88000',27,'bdc_14.jpg','Bánh kem trà Bá Tước và quả lý chua đen là một món tráng miệng sang trọng, kết hợp tinh tế giữa hương vị thơm mát của trà Bá Tước (Earl Grey) và vị chua ngọt đặc trưng của quả lý chua đen (blackcurrant). Xen kẽ giữa các lớp bánh là lớp kem mịn béo và sốt quả lý chua đen, tạo nên sự cân bằng hoàn hảo giữa vị ngọt dịu và vị chua thanh',1,1),
(44,'Bánh kem dâu và vani','270000','230000',30,'bdc_15.jpg','Vị béo ngậy của kem và hương vani quyện với vị chua ngọt tự nhiên của dâu, tạo nên sự cân bằng hoàn hảo. Bánh thường được trang trí bằng dâu tươi và lớp kem phủ bên ngoài, mang lại vẻ ngoài đẹp mắt và hương vị tươi mới, nhẹ nhàng.',1,1),
(45,'Madeira cake','273000','232000',39,'tr_1.jpg','Madeira cake là một loại bánh ngọt truyền thống của Anh, nổi bật với độ ẩm, mềm mại và hương vị thơm ngon. Bánh thường được làm từ những nguyên liệu đơn giản như bột mì, bơ, đường và trứng, cùng với một chút tinh chất vani hoặc vỏ chanh để tăng thêm hương vị.',1,2),
(46,'Hummingbird cake','273000','232000',10,'tr_2.jpg','Hummingbird cake là một món bánh ngọt truyền thống của miền Nam nước Mỹ, nổi bật với sự kết hợp giữa hương vị thơm ngon của chuối, dứa và hạt pecan. Bánh thường có kết cấu ẩm mềm và được làm từ bột mì, đường, trứng, và dầu ăn, mang lại độ ẩm tự nhiên.',1,2),
(47,'Whole orange cake','323000','275000',12,'tr_3.jpg','Bánh thường được làm từ bột mì, đường, trứng, bơ, và cả quả cam được xay nhuyễn. Sự kết hợp này không chỉ tạo nên độ ẩm hoàn hảo cho bánh mà còn mang lại hương vị cam đậm đà. Bánh có kết cấu mềm mại và thường được nướng trong khuôn tròn, tạo hình đẹp mắt.',1,2),
(48,'Doreen''s sultana cake','177000','150000',35,'tr_4.jpg','Doreen''s sultana cake là một loại bánh ngọt truyền thống, thường được làm từ bột mì, đường, bơ, trứng và nho khô sultana. Nho sultana, với màu vàng sáng và vị ngọt tự nhiên, là điểm nhấn chính trong bánh, mang lại hương vị thơm ngon và độ ẩm.',1,2),
(49,'Rose and vanilla cake','145000','123000',35,'tr_5.jpg','Điểm đặc biệt của loại bánh này chính là việc sử dụng tinh dầu hoa hồng hoặc nước hoa hồng, mang đến hương vị tinh tế và lạ miệng. Bánh có thể được trang trí bằng lớp kem bơ vanilla, thường được thêm một chút hương hoa hồng để làm tăng thêm sự hài hòa giữa hai hương vị.',1,2),
(50,'Classic fruit cake','161000','137000',16,'tr_6.jpg','Classic fruit cake là món ăn không thể thiếu trong các dịp lễ hội, đặc biệt là Giáng sinh, nơi bánh thường được trang trí bằng lớp kem màu trắng hoặc bột đường, tạo ra vẻ ngoài hấp dẫn. Hương vị phong phú và đa dạng của bánh sẽ mang đến trải nghiệm ngọt ngào và ấm áp cho người thưởng thức.',1,2),
(51,'Devil''s food cake','270000','230000',31,'tr_7.jpg','Điểm đặc trưng của Devil''s food cake là sự kết hợp của bột cacao, tạo ra màu sắc tối và hương vị chocolate phong phú. Bánh có thể được nướng thành nhiều lớp và thường được phủ bằng kem chocolate hoặc cream cheese frosting để làm tăng thêm độ ngọt và độ béo. Một số công thức cũng thêm cà phê để làm nổi bật hương vị của chocolate.',1,2),
(52,'Passionfruit sponge cake','392000','333000',32,'tr_8.jpg','Passionfruit sponge cake là một loại bánh bông lan nhẹ nhàng và thơm ngon, nổi bật với hương vị tươi mát của trái chanh dây (passionfruit). Bánh thường được làm từ các nguyên liệu cơ bản như bột mì, đường, trứng, bơ và tinh chất vani, cùng với nước hoặc purée từ trái chanh dây để mang lại hương vị độc đáo.',1,2),
(53,'Lemon semolina cake','110000','94000',12,'tr_9.jpg','Lemon semolina cake thường được phục vụ đơn giản hoặc trang trí với một chút vỏ chanh bào, kèm theo kem tươi hoặc sữa chua. Đây là món bánh lý tưởng cho những người yêu thích vị chua ngọt nhẹ nhàng, thích hợp cho các dịp trà chiều hoặc làm món tráng miệng sau bữa ăn.',1,2),
(54,'Apple and vanilla tea cake','351000','298000',13,'tr_10.jpg','Hương vị của bánh là sự hòa quyện giữa vị ngọt dịu của vanilla và hương thơm tự nhiên từ táo. Táo giúp bánh có độ ẩm mịn, trong khi vanilla mang lại sự ấm áp và thơm mát. Bánh thường có kết cấu mềm mại, nhẹ nhàng, dễ ăn và không quá ngọt, rất phù hợp để thưởng thức cùng một tách trà nóng hoặc cà phê.',1,2),
(55,'Apple and raspberry crumble tea cake','211000','179000',17,'tr_11.jpg','Sự kết hợp giữa vị chua nhẹ của quả mâm xôi, vị ngọt dịu của táo, và độ giòn của crumble tạo ra sự cân bằng hoàn hảo. Bánh có kết cấu vừa xốp vừa giòn, rất dễ ăn và không quá ngọt. Đây là một món bánh lý tưởng để dùng kèm với trà hoặc cà phê, mang lại cảm giác ấm áp và thoải mái, rất thích hợp cho các buổi tiệc trà hoặc những lúc thư giãn.',1,2),
(56,'Easiest-ever mandarin and almond syrup cake','108000','92000',30,'tr_12.jpg','Điểm nổi bật của bánh là lớp siro quýt thấm đều vào từng miếng bánh, làm tăng hương vị tươi mát và giữ cho bánh luôn mềm mại. Hạnh nhân mang lại một kết cấu hơi dai và vị béo nhẹ, hòa quyện hoàn hảo với vị chua ngọt của quýt. Bánh này thường được phục vụ cùng kem tươi hoặc sữa chua để làm tăng thêm độ phong phú của món tráng miệng.',1,2),
(57,'Carrot and walnut cake','316000','269000',20,'tr_13.jpg','Carrot and walnut cake là một loại bánh ngọt cổ điển, kết hợp giữa cà rốt bào sợi và hạt óc chó (walnut) bùi béo, mang lại hương vị thơm ngon và kết cấu phong phú. Bánh thường được làm từ bột mì, đường, cà rốt tươi bào, hạt óc chó băm nhỏ, trứng, dầu và các gia vị như quế và nhục đậu khấu để tạo hương vị ấm áp.',1,2),
(58,'Chocolate brownie slab cake','189000','161000',13,'tr_14.jpg','Điểm nổi bật của brownie slab cake là sự hòa quyện giữa độ mềm mịn và độ đặc của bánh, cùng với hương vị đậm đà, khiến nó trở thành một món tráng miệng hoàn hảo cho những ai yêu thích chocolate. Bánh có thể được trang trí với lớp kem chocolate, quả hạch, hoặc các loại topping khác như hạt điều, hạnh nhân hoặc trái cây khô, tạo nên sự phong phú và hấp dẫn hơn cho món bánh.',1,2),
(59,'Rich black forest cake','217000','184000',18,'tr_15.jpg','Rich black forest cake là một loại bánh ngọt nổi tiếng, được biết đến với hương vị phong phú và kết cấu hấp dẫn. Bánh thường được làm từ lớp bánh chocolate đen mềm mịn, được phết kem tươi, mứt anh đào và những lát anh đào tươi hoặc ngâm.',1,2),
(60,'Su Kem Hạt Phỉ','106000','90000',40,'cc_1.jpg','Su kem hạt phỉ là một món bánh ngọt hấp dẫn, kết hợp giữa lớp vỏ su giòn và nhân kem hạt phỉ béo ngậy. Lớp vỏ su được làm từ bột mì, trứng, và bơ, nướng cho đến khi vàng ruộm và giòn tan. Phần nhân kem thường được chế biến từ kem tươi hoặc kem phô mai, kết hợp với hạt phỉ nghiền, mang đến hương vị bùi bùi, thơm ngon.',1,3),
(61,'Bánh Giỏ Quýt','166000','141000',24,'cc_2.jpg','Bánh giỏ quýt là một loại bánh ngọt truyền thống, mang hương vị đặc trưng của quả quýt tươi mát. Bánh được làm từ lớp bột mì mềm mịn, thường được nhồi cùng với nhân quýt được chế biến từ nước cốt quýt, đường và có thể thêm một chút bơ để tăng độ béo ngậy.',1,3),
(62,'Bánh kem chuối và dừa','392000','333000',37,'cc_3.jpg','Một món bánh ngọt nhỏ gọn, hấp dẫn, kết hợp giữa vị ngọt tự nhiên của chuối chín và hương thơm béo ngậy của dừa. Bánh có lớp cốt mềm mịn, được phủ kem dừa mịn màng, mang lại cảm giác nhẹ nhàng và tươi mới. Những lát chuối tươi và sợi dừa nạo trang trí trên mặt bánh không chỉ làm tăng thêm hương vị mà còn tạo nên vẻ đẹp bắt mắt.',1,3),
(63,'Bánh Kem Dâu và Vani','173000','147000',28,'cc_4.jpg','Bánh kem dâu và vani là một món tráng miệng tinh tế, nổi bật với sự kết hợp giữa hương vị ngọt ngào của dâu tây tươi và sự béo ngậy của kem vani.',1,3),
(64,'Bánh Kisses Trà Bá Tước và Việt Quất','165000','140000',30,'cc_5.jpg','Lớp cốt bánh thường mềm mịn, được làm từ bột mì, đường, và hương trà Bá Tước, mang lại sự thanh mát và nhẹ nhàng. Nhân bánh là một hỗn hợp kem việt quất béo ngậy, tạo nên sự hài hòa giữa vị trà chát nhẹ và vị chua ngọt của trái cây',1,3),
(65,'Bánh Ốp La Cheesecake','234000','199000',25,'cc_6.jpg','Bánh ốp la cheesecake là một món tráng miệng độc đáo, mang hình dáng giống như một chiếc bánh ốp la (trứng chiên), nhưng lại là một phiên bản cheesecake sáng tạo. Bánh có lớp đế giòn từ bánh quy nghiền hoặc bột mì, được phủ lên một lớp kem phô mai béo ngậy, mịn màng, tạo nên vị ngọt dịu và chua nhẹ.',1,3),
(66,'Bánh Tiramisu Lava','340000','289000',10,'cc_7.jpg','Khi cắt bánh, phần nhân tiramisu chảy ra một cách hấp dẫn, mang lại trải nghiệm thú vị cho người thưởng thức. Bánh tiramisu lava thường được trang trí bằng bột cacao rắc lên trên hoặc một chút kem tươi, tạo điểm nhấn cho vẻ đẹp của món tráng miệng.',1,3),
(67,'Grain Seaweed Cookie','121000','103000',39,'cc_8.jpg','Grain seaweed cookie là một loại bánh quy độc đáo, kết hợp giữa các loại ngũ cốc dinh dưỡng và vị umami đặc trưng của rong biển. Bánh quy được làm từ bột mì, ngũ cốc như yến mạch, hạt chia hoặc hạt lanh, cùng với rong biển nghiền nhỏ, mang lại một hương vị mới lạ và hấp dẫn.',1,3),
(68,'Spicy Meat Floss Cookie','312000','265000',30,'cc_9.jpg','Spicy meat floss cookie là một món bánh quy độc đáo, kết hợp giữa vị ngọt nhẹ của bánh và hương vị mặn mà, cay nồng của thịt xé (floss). Bánh quy thường được làm từ bột mì, bơ, và đường, tạo ra một lớp vỏ giòn tan, nhưng bên trong lại chứa lớp thịt xé gia vị cay thơm, mang đến trải nghiệm vị giác thú vị.',1,3),
(69,'Passion Fruit Cookie','321000','273000',34,'cc_10.jpg','Passion fruit cookie là một loại bánh quy thơm ngon, mang hương vị tươi mát của trái chanh dây. Bánh thường được làm từ bột mì, bơ, đường, và nước ép hoặc tinh chất chanh dây, tạo ra một lớp vỏ bánh giòn tan với hương vị chua ngọt đặc trưng.',1,3),
(70,'Cream cheese Cookie','259000','220000',38,'cc_11.jpg','Cream cheese cookie là một loại bánh quy mềm mại, kết cấu mịn màng và béo ngậy, được làm từ bột mì, bơ và kem phô mai. Sự kết hợp của kem phô mai không chỉ mang lại độ ẩm cho bánh mà còn tạo nên hương vị đặc trưng, vừa ngọt vừa có chút chua nhẹ.',1,3),
(71,'Fruits and Nuts Biscotti','287000','244000',23,'cc_12.jpg','Fruits and nuts biscotti là một loại bánh quy truyền thống của Ý, được làm từ bột mì, đường, trứng và các loại trái cây khô cùng với hạt dinh dưỡng, như hạnh nhân, óc chó hoặc hạt phỉ. Bánh biscotti có kết cấu giòn tan, thường được nướng hai lần để tạo ra độ giòn đặc trưng, giúp bánh không bị ỉu và dễ bảo quản.',1,3),
(72,'Seaweed Snack','392000','333000',24,'cc_13.jpg','Món ăn vặt nhẹ và dinh dưỡng, được làm từ rong biển được chế biến và nướng giòn. Rong biển thường được tẩm ướp với một chút muối, dầu ăn, và đôi khi là gia vị như tỏi hoặc ớt, tạo ra hương vị thơm ngon và hấp dẫn.',1,3),
(73,'Bánh Macaron Caramen','218000','185000',24,'cc_14.jpg','Bánh macaron caramel là một phiên bản ngọt ngào và hấp dẫn của loại bánh truyền thống Pháp, nổi bật với lớp vỏ mỏng giòn tan và nhân caramel béo ngậy. Lớp vỏ macaron được làm từ bột hạnh nhân, đường bột và lòng trắng trứng, thường có màu nâu vàng nhẹ, tạo cảm giác bắt mắt',1,3),
(74,'Bánh Macaron Lý Chua Đen & Oải Hương','174000','148000',31,'cc_15.jpg','Một món bánh ngọt tinh tế và độc đáo, kết hợp giữa hương vị chua ngọt của quả lý chua đen và hương thơm nhẹ nhàng của oải hương. Lớp vỏ macaron được làm từ bột hạnh nhân, đường bột và lòng trắng trứng, thường có màu tím nhẹ hoặc đen, tạo cảm giác bắt mắt.',1,3),
(75,'High Fiber Bread','227000','193000',40,'br_1.jpg','High Fiber được làm từ bột mì thô giàu chất xơ của Đức. Với hàm lượng chất xơ cao, nhiều hạt dinh dưỡng, ít calories và giúp no lâu nên bánh đặc biệt thích hợp cho người ăn kiêng',1,4),
(76,'Whole Wheat Pita Bread','215000','183000',14,'br_2.jpg','Bánh Mỳ Pita Nguyên Cám của Hy Lạp',1,4),
(77,'Whole Wheat English Muffins','269000','229000',34,'br_3.jpg','Bánh mì kiểu Anh, hình tròn bằng khum tay, chất bột mịn dai, vỏ bánh giòn, kiểu dày, đặc chứ không giòn tan, đặc biệt hơn rất nhiều loại bánh mì khác. Bánh được làm từ bột mì nguyên cám, mật ong, men, nước, sữa… phù hợp cho một bữa sáng nhanh mà vẫn đầy đủ chất dinh dưỡng.',1,4),
(78,'Croissant','248000','211000',31,'br_4.jpg','Bánh sừng bò ngàn lớp truyền thống với hàm lượng bơ cao, tạo nên hương vị thơm béo đặc trưng. Vỏ bánh vàng ươm, xốp giòn, dễ dàng xé ra từng lớp mỏng nhỏ đúng chuẩn.',1,4),
(79,'Pate Chaud','251000','213000',11,'br_5.jpg','Phần vỏ nóng giòn được kỳ công thực hiện từ bột mì puff pastry và bơ Pháp béo ngậy đan xen ngàn lớp. Bao bọc nhân bánh thịt bằm, pa-tê, cùng các loại gia vị đậm đà, tạo nên hương vị thơm ngon khó cưỡng.',1,4),
(80,'Bánh Croissant Oreo Phô Mai','364000','309000',37,'br_6.jpg','Bánh croissant Oreo phô mai là sự kết hợp độc đáo giữa lớp vỏ bánh croissant giòn xốp, bơ ngậy và hương vị hiện đại của Oreo và phô mai. Bên trong lớp bánh là nhân kem phô mai béo mịn, hòa quyện cùng vụn Oreo giòn rụm, tạo nên một sự tương phản thú vị giữa kết cấu mềm mại và độ giòn tan.',1,4),
(81,'Bánh Mì Brioche Trân Châu Caramen','125000','106000',30,'br_7.jpg','Bánh brioche có kết cấu bông xốp, ẩm mịn, hòa quyện cùng lớp trân châu caramen bóng mượt, có hương vị ngọt dịu và chút đắng nhẹ từ đường caramen cháy',1,4),
(82,'Bánh Trà Xanh Dâu Latte Croissant','174000','148000',37,'br_8.jpg','Bánh trà xanh dâu latte croissant là sự kết hợp thú vị giữa lớp vỏ croissant giòn rụm, bơ ngậy và hương vị độc đáo của trà xanh, dâu tây và latte. Bên trong lớp vỏ bánh xốp mềm là nhân kem trà xanh thơm mát và sốt dâu tây ngọt ngào, mang lại sự cân bằng hoàn hảo giữa vị chát nhẹ của trà xanh, vị ngọt chua của dâu tươi và độ béo mịn của kem latte',1,4),
(83,'Bánh Croissant Trứng Muối','293000','249000',36,'br_9.jpg','Bên trong bánh là lớp nhân kem trứng muối mềm mịn, thơm lừng với vị bùi béo đậm đà. Sự hòa quyện giữa lớp vỏ croissant xốp giòn và nhân trứng muối đậm vị tạo nên một trải nghiệm ẩm thực độc đáo, vừa lạ miệng vừa hấp dẫn.',1,4),
(84,'Berry Cream Cheese Bun','315000','268000',26,'br_10.jpg','Berry cream cheese bun là một loại bánh ngọt mềm mại, kết hợp giữa vị ngọt chua thanh mát của các loại quả mọng (như dâu, việt quất, mâm xôi) và sự béo mịn của nhân kem phô mai. Phần bánh bông xốp, nhẹ nhàng, được nướng vàng óng, bên trong chứa đầy nhân phô mai mịn màng và sốt quả mọng, tạo nên sự cân bằng hoàn hảo giữa vị ngọt, chua và béo ngậy.',1,4),
(85,'Orange Chocolate Croissant','121000','103000',18,'br_11.jpg','Lớp vỏ bánh được làm từ bột mì và bơ, nở xốp, tạo cảm giác béo ngậy. Nhân bên trong thường bao gồm sô-cô-la chảy và tinh chất cam, mang đến sự hòa quyện hoàn hảo giữa vị ngọt đắng của sô-cô-la và hương chua ngọt nhẹ nhàng của cam.',1,4),
(86,'Bánh mì sữa kiểu Pháp','354000','301000',31,'br_12.jpg','Bánh mì sữa kiểu Pháp, hay còn gọi là "pain au lait," là một loại bánh mì ngọt mềm mại, có kết cấu bông xốp và hương vị thơm ngon, ngọt nhẹ. Bánh thường được làm từ bột mì, sữa tươi, đường, và bơ, mang lại vị béo ngậy và mùi thơm quyến rũ. Bánh được nướng vàng đều, có lớp vỏ ngoài mềm mại, bên trong ẩm và dai',1,4),
(87,'Bánh Chuối Sô-cô-la','364000','309000',21,'br_13.jpg','Cốt bánh mềm mại, thường được làm từ bột mì, chuối nghiền, đường và trứng, mang lại độ ẩm và hương vị đặc trưng. Những miếng sô-cô-la được thêm vào bánh khi nướng tạo ra những điểm nhấn đắng ngọt, làm tăng thêm sự phong phú cho hương vị.',1,4),
(88,'Bông lan trứng muối','329000','280000',25,'br_14.jpg','Bông lan trứng muối là một món bánh ngọt đặc trưng, nổi bật với sự kết hợp độc đáo giữa bánh bông lan mềm mại và hương vị đậm đà của trứng muối. Cốt bánh thường được làm từ bột mì, trứng, và đường, tạo ra kết cấu nhẹ và xốp. Nhân bánh được làm từ kem trứng muối béo ngậy, có vị mặn ngọt hài hòa, mang lại trải nghiệm ẩm thực thú vị',1,4),
(89,'Bánh Mì Cuộn Nho Quế','227000','193000',20,'br_15.jpg','Bánh được làm từ bột mì, sữa, đường và bơ, tạo ra lớp vỏ ngoài mềm mại và xốp. Phần nhân bên trong thường bao gồm nho khô ngọt mềm và bột quế, tạo ra sự hòa quyện hoàn hảo giữa vị ngọt và vị cay.',1,4);


CREATE TABLE `tbl_product_photo` (
    `pp_id` int(11) NOT NULL AUTO_INCREMENT,
    `photo` varchar(255) NOT NULL,
    `p_id` int(11) NOT NULL,
    PRIMARY KEY (`pp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_language` (
    `lang_id` int(11) NOT NULL AUTO_INCREMENT,
    `lang_name` varchar(255) NOT NULL,
    `lang_value` text NOT NULL,
    PRIMARY KEY (`lang_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_customer_message` (
    `customer_message_id` int(11) NOT NULL AUTO_INCREMENT,
    `subject` varchar(255) NOT NULL,
    `message` text NOT NULL,
    `order_detail` text NOT NULL,
    `cust_id` int(11) NOT NULL,
    PRIMARY KEY (`customer_message_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;



CREATE TABLE `tbl_faq` (
    `faq_id` int(11) NOT NULL AUTO_INCREMENT,
    `faq_title` varchar(255) NOT NULL,
    `faq_content` text NOT NULL,
    PRIMARY KEY (`faq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_order` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `product_id` int(11) NOT NULL,
    `product_name` varchar(255) NOT NULL,
    `quantity` varchar(50) NOT NULL,
    `unit_price` varchar(50) NOT NULL,
    `payment_id` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_page` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `about_title` varchar(255) NOT NULL,
    `about_content` text NOT NULL,
    `about_banner` varchar(255) NOT NULL,
    `about_meta_title` varchar(255) NOT NULL,
    `about_meta_keyword` text NOT NULL,
    `about_meta_description` text NOT NULL,
    `faq_title` varchar(255) NOT NULL,
    `faq_banner` varchar(255) NOT NULL,
    `faq_meta_title` varchar(255) NOT NULL,
    `faq_meta_keyword` text NOT NULL,
    `faq_meta_description` text NOT NULL,
    `blog_title` varchar(255) NOT NULL,
    `blog_banner` varchar(255) NOT NULL,
    `blog_meta_title` varchar(255) NOT NULL,
    `blog_meta_keyword` text NOT NULL,
    `blog_meta_description` text NOT NULL,
    `contact_title` varchar(255) NOT NULL,
    `contact_banner` varchar(255) NOT NULL,
    `contact_meta_title` varchar(255) NOT NULL,
    `contact_meta_keyword` text NOT NULL,
    `contact_meta_description` text NOT NULL,
    `pgallery_title` varchar(255) NOT NULL,
    `pgallery_banner` varchar(255) NOT NULL,
    `pgallery_meta_title` varchar(255) NOT NULL,
    `pgallery_meta_keyword` text NOT NULL,
    `pgallery_meta_description` text NOT NULL,
    `vgallery_title` varchar(255) NOT NULL,
    `vgallery_banner` varchar(255) NOT NULL,
    `vgallery_meta_title` varchar(255) NOT NULL,
    `vgallery_meta_keyword` text NOT NULL,
    `vgallery_meta_description` text NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_payment` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `customer_id` int(11) NOT NULL,
    `customer_name` varchar(255) NOT NULL,
    `customer_email` varchar(255) NOT NULL,
    `payment_date` varchar(50) NOT NULL,
    `txnid` varchar(255) NOT NULL,
    `paid_amount` int(11) NOT NULL,
    `payment_method` varchar(20) NOT NULL,
    `payment_status` varchar(25) NOT NULL,
    `shipping_status` varchar(20) NOT NULL,
    `payment_id` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_photo` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `caption` varchar(255) NOT NULL,
    `photo` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_settings` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `logo` varchar(255) NOT NULL,
    `favicon` varchar(255) NOT NULL,
    `footer_about` text NOT NULL,
    `footer_copyright` text NOT NULL,
    `contact_address` text NOT NULL,
    `contact_email` varchar(255) NOT NULL,
    `contact_phone` varchar(255) NOT NULL,
    `contact_fax` varchar(255) NOT NULL,
    `contact_map_iframe` text NOT NULL,
    `receive_email` varchar(255) NOT NULL,
    `receive_email_subject` varchar(255) NOT NULL,
    `receive_email_thank_you_message` text NOT NULL,
    `forget_password_message` text NOT NULL,
    `total_recent_post_footer` int(10) NOT NULL,
    `total_popular_post_footer` int(10) NOT NULL,
    `total_recent_post_sidebar` int(11) NOT NULL,
    `total_popular_post_sidebar` int(11) NOT NULL,
    `total_featured_product_home` int(11) NOT NULL,
    `total_latest_product_home` int(11) NOT NULL,
    `total_popular_product_home` int(11) NOT NULL,
    `meta_title_home` text NOT NULL,
    `meta_keyword_home` text NOT NULL,
    `meta_description_home` text NOT NULL,
    `banner_login` varchar(255) NOT NULL,
    `banner_registration` varchar(255) NOT NULL,
    `banner_forget_password` varchar(255) NOT NULL,
    `banner_reset_password` varchar(255) NOT NULL,
    `banner_search` varchar(255) NOT NULL,
    `banner_cart` varchar(255) NOT NULL,
    `banner_checkout` varchar(255) NOT NULL,
    `banner_product_category` varchar(255) NOT NULL,
    `banner_blog` varchar(255) NOT NULL,
    `cta_title` varchar(255) NOT NULL,
    `cta_content` text NOT NULL,
    `cta_read_more_text` varchar(255) NOT NULL,
    `cta_read_more_url` varchar(255) NOT NULL,
    `cta_photo` varchar(255) NOT NULL,
    `featured_product_title` varchar(255) NOT NULL,
    `featured_product_subtitle` varchar(255) NOT NULL,
    `latest_product_title` varchar(255) NOT NULL,
    `latest_product_subtitle` varchar(255) NOT NULL,
    `popular_product_title` varchar(255) NOT NULL,
    `popular_product_subtitle` varchar(255) NOT NULL,
    `testimonial_title` varchar(255) NOT NULL,
    `testimonial_subtitle` varchar(255) NOT NULL,
    `testimonial_photo` varchar(255) NOT NULL,
    `blog_title` varchar(255) NOT NULL,
    `blog_subtitle` varchar(255) NOT NULL,
    `newsletter_text` text NOT NULL,
    `paypal_email` varchar(255) NOT NULL,
    `stripe_public_key` varchar(255) NOT NULL,
    `stripe_secret_key` varchar(255) NOT NULL,
    `bank_detail` text NOT NULL,
    `before_head` text NOT NULL,
    `after_body` text NOT NULL,
    `before_body` text NOT NULL,
    `home_service_on_off` int(11) NOT NULL,
    `home_welcome_on_off` int(11) NOT NULL,
    `home_featured_product_on_off` int(11) NOT NULL,
    `home_latest_product_on_off` int(11) NOT NULL,
    `home_popular_product_on_off` int(11) NOT NULL,
    `home_testimonial_on_off` int(11) NOT NULL,
    `home_blog_on_off` int(11) NOT NULL,
    `newsletter_on_off` int(11) NOT NULL,
    `ads_above_welcome_on_off` int(1) NOT NULL,
    `ads_above_featured_product_on_off` int(1) NOT NULL,
    `ads_above_latest_product_on_off` int(1) NOT NULL,
    `ads_above_popular_product_on_off` int(1) NOT NULL,
    `ads_above_testimonial_on_off` int(1) NOT NULL,
    `ads_category_sidebar_on_off` int(1) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_shipping_cost` (
    `shipping_cost_id` int(11) NOT NULL AUTO_INCREMENT,
    `amount` varchar(20) NOT NULL,
    PRIMARY KEY (`shipping_cost_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_shipping_cost_all` (
    `sca_id` int(11) NOT NULL AUTO_INCREMENT,
    `amount` varchar(20) NOT NULL,
    PRIMARY KEY (`sca_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_slider` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `photo` varchar(255) NOT NULL,
    `heading` varchar(255) NOT NULL,
    `content` text NOT NULL,
    `button_text` varchar(255) NOT NULL,
    `button_url` varchar(255) NOT NULL,
    `position` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_social` (
    `social_id` int(11) NOT NULL AUTO_INCREMENT,
    `social_name` varchar(30) NOT NULL,
    `social_url` varchar(255) NOT NULL,
    `social_icon` varchar(30) NOT NULL,
    PRIMARY KEY (`social_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_subscriber` (
    `subs_id` int(11) NOT NULL AUTO_INCREMENT,
    `subs_email` varchar(255) NOT NULL,
    `subs_date` varchar(100) NOT NULL,
    `subs_date_time` varchar(100) NOT NULL,
    `subs_hash` varchar(255) NOT NULL,
    `subs_active` int(11) NOT NULL,
    PRIMARY KEY (`subs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `tbl_user` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `full_name` varchar(100) NOT NULL,
    `email` varchar(255) NOT NULL,
    `phone` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    `photo` varchar(255) NOT NULL,
    `role` varchar(30) NOT NULL,
    `status` varchar(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tbl_user` (`id`, `full_name`, `email`, `phone`, `password`, `photo`, `role`, `status`) VALUES
(1, 'Administrator', 'admin@mail.com', '7777777777', 'd00f5d5217896fb7fd601412cb890830', 'user-1.png', 'Super Admin', 'Active');

ALTER TABLE `tbl_product`
    ADD CONSTRAINT `tbl_product_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `tbl_category` (`cat_id`);

ALTER TABLE `tbl_product_photo`
    ADD CONSTRAINT `tbl_product_photo_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `tbl_product` (`p_id`);

ALTER TABLE `tbl_order`
    ADD CONSTRAINT `tbl_order_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `tbl_product` (`p_id`);

ALTER TABLE `tbl_payment`
    ADD CONSTRAINT `tbl_payment_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `tbl_customer` (`cust_id`);

ALTER TABLE `tbl_shipping_cost_all`
    ADD CONSTRAINT `tbl_shipping_cost_all_ibfk_1` FOREIGN KEY (`sca_id`) REFERENCES `tbl_shipping_cost` (`shipping_cost_id`);


