
export interface Translation {
    mainNav: {
        dashboard: string;
        students: string;
        income: string;
        expenses: string;
        reports: string;
    };
    secondaryNav: {
        share: string;
        feedback: string;
        rate: string;
        about: string;
    };
    logout: string;
    menu: string;
    share: {
        title: string;
        text: string;
        errorTitle: string;
        errorDescription: string;
        notSupportedTitle: string;
        notSupportedDescription: string;
    };
    feedback: {
        title: string;
        description: string;
        label: string;
        placeholder: string;
        cancel: string;
        submit: string;
        thanksTitle: string;
        thanksDescription: string;
    };
    rating: {
        title: string;
        description: string;
        placeholder: string;
        cancel: string;
        submit: string;
        thanksTitle: string;
        thanksDescription: string;
    };
    about: {
        title: string;
        description: string;
        developerInfo: string;
        name: string;
        close: string;
    };
    login: {
        title: string;
        passwordPlaceholder: string;
        loginButton: string;
        backgroundButton: string;
        footer: string;
        successTitle: string;
        successDescription: string;
        errorTitle: string;
        errorDescription: string;
    };
    dashboard: {
        welcomeMessage: string;
        studentsCard: {
            title: string;
            description: string;
        },
        incomeCard: {
            title: string;
            description: string;
        },
        expensesCard: {
            title: string;
            description: string;
        },
        reportsCard: {
            title: string;
            description: string;
        },
        searchCard: {
            title: string;
            description: string;
            placeholder: string;
        },
        addIncomeButton: string;
        addExpenseButton: string;
    }
}

const en: Translation = {
    mainNav: {
        dashboard: 'Dashboard',
        students: 'Student Information',
        income: 'Income',
        expenses: 'Expenses',
        reports: 'Reports',
    },
    secondaryNav: {
        share: 'Share App',
        feedback: 'Feedback',
        rate: 'Rate App',
        about: 'About App',
    },
    logout: 'Logout',
    menu: 'Menu',
    share: {
        title: 'Sedthasard App',
        text: 'Check out this interesting financial tracking app!',
        errorTitle: 'Sharing Failed',
        errorDescription: 'Could not share the app at this time.',
        notSupportedTitle: 'Not Supported',
        notSupportedDescription: 'Your browser does not support sharing.',
    },
    feedback: {
        title: 'Send Feedback',
        description: 'We would love to hear your thoughts! Please let us know what you think about this app.',
        label: 'Feedback',
        placeholder: 'Write your feedback here...',
        cancel: 'Cancel',
        submit: 'Submit',
        thanksTitle: 'Thank you for your feedback!',
        thanksDescription: 'We have received your feedback.'
    },
    rating: {
        title: 'Rate the App',
        description: 'How satisfied are you with this app?',
        placeholder: 'Tell us more about your experience (optional)',
        cancel: 'Cancel',
        submit: 'Submit Rating',
        thanksTitle: 'Thanks for the {rating} star rating!',
        thanksDescription: 'Thank you for helping us improve.',
    },
    about: {
        title: 'About App',
        description: 'This is the "Sedthasard App", created to record data and finances for students of the Political Economy and Economic Management major.',
        developerInfo: 'Developer Information',
        name: 'Mr. Somvang Pingsanijai',
        close: 'Close',
    },
    login: {
        title: 'Sedthasard App',
        passwordPlaceholder: 'Enter password (phone number)',
        loginButton: 'Login',
        backgroundButton: 'Select Background Image',
        footer: 'This app is for recording data and income-expenses for Political Economy students only.',
        successTitle: 'Login Successful',
        successDescription: 'Welcome!',
        errorTitle: 'Incorrect Password',
        errorDescription: 'Please try again.',
    },
    dashboard: {
        welcomeMessage: 'Welcome to the Data Recording and Income-Expense Tracking App for Students of the Political Economy and Economic Management major.',
        studentsCard: {
            title: 'Student Information',
            description: 'Manage data for 31 students',
        },
        incomeCard: {
            title: 'Income',
            description: 'Record and track income',
        },
        expensesCard: {
            title: 'Expenses',
            description: 'Record and track expenses',
        },
        reportsCard: {
            title: 'Reports',
            description: 'Summary of income and expenses',
        },
        searchCard: {
            title: 'Search Data',
            description: 'Search all data saved in the application.',
            placeholder: 'Type to search for students, income, or expenses...',
        },
        addIncomeButton: 'Add Income',
        addExpenseButton: 'Add Expense',
    }
};

const lo: Translation = {
    mainNav: {
        dashboard: 'ໜ້າຫຼັກ',
        students: 'ຂໍ້ມູນນັກສຶກສາ',
        income: 'ລາຍຮັບ',
        expenses: 'ລາຍຈ່າຍ',
        reports: 'ລາຍງານ',
    },
    secondaryNav: {
        share: 'ແບ່ງປັນແອັບ',
        feedback: 'ຄຳຕິຊົມ',
        rate: 'ໃຫ້ຄະແນນ',
        about: 'ຂໍ້ມູນແອັບ',
    },
    logout: 'ອອກຈາກລະບົບ',
    menu: 'ເມນູ',
    share: {
        title: 'Sedthasard App',
        text: 'ກວດເບິ່ງແອັບຕິດຕາມການເງິນທີ່ໜ້າສົນໃຈນີ້!',
        errorTitle: 'ການແບ່ງປັນລົ້ມເຫລວ',
        errorDescription: 'ບໍ່ສາມາດແບ່ງປັນແອັບໄດ້ໃນຕອນນີ້.',
        notSupportedTitle: 'ບໍ່ຮອງຮັບ',
        notSupportedDescription: 'ຕົວທ່ອງເວັບຂອງທ່ານບໍ່ຮອງຮັບການແບ່ງປັນ.',
    },
    feedback: {
        title: 'ສົ່ງຄຳຕິຊົມ',
        description: 'ພວກເຮົາຢາກຮັບຟັງຄວາມຄິດເຫັນຂອງທ່ານ! ກະລຸນາບອກພວກເຮົາວ່າທ່ານຄິດແນວໃດກ່ຽວກັບແອັບນີ້.',
        label: 'ຄຳຕິຊົມ',
        placeholder: 'ຂຽນຄຳຕິຊົມຂອງທ່ານທີ່ນີ້...',
        cancel: 'ຍົກເລີກ',
        submit: 'ສົ່ງ',
        thanksTitle: 'ຂອບໃຈສຳລັບຄຳຕິຊົມ!',
        thanksDescription: 'ພວກເຮົາໄດ້ຮັບຄຳຄິດເຫັນຂອງທ່ານແລ້ວ.'
    },
    rating: {
        title: 'ໃຫ້ຄະແນນແອັບ',
        description: 'ທ່ານພໍໃຈກັບແອັບນີ້ຫຼາຍປານໃດ?',
        placeholder: 'ບອກພວກເຮົາເພີ່ມເຕີມກ່ຽວກັບປະສົບການຂອງທ່ານ (ບໍ່ບັງຄັບ)',
        cancel: 'ຍົກເລີກ',
        submit: 'ສົ່ງຄະແນນ',
        thanksTitle: 'ຂອບໃຈທີ່ໃຫ້ {rating} ດາວ!',
        thanksDescription: 'ຂອບໃຈທີ່ຊ່ວຍພວກເຮົາປັບປຸງໃຫ້ດີຂຶ້ນ.',
    },
    about: {
        title: 'ກ່ຽວກັບແອັບ',
        description: 'ແອັບນີ້ແມ່ນ "Sedthasard App" ສ້າງຂຶ້ນເພື່ອບັນທຶກຂໍ້ມູນ ແລະ ການເງິນຂອງນັກສຶກສາ ປຕ ສາຍ ເສດຖະສາດ ແລະ ຄຸ້ມຄອງເສດຖະກິດ.',
        developerInfo: 'ຂໍ້ມູນຜູ້ພັດທະນາ',
        name: 'ທ້າວ ສົມຫວັງ ປິງສະນີໃຈ',
        close: 'ປິດ',
    },
    login: {
        title: 'Sedthasard App',
        passwordPlaceholder: 'ໃສ່ລະຫັດຜ່ານ (ເບີໂທ)',
        loginButton: 'ເຂົ້າສູ່ລະບົບ',
        backgroundButton: 'ເລືອກຮູບພື້ນຫຼັງ',
        footer: 'ແອັບນີ້ໃຊ້ສຳລັບບັນທຶກຂໍ້ມູນ ແລະ ລາຍຮັບ-ລາຍຈ່າຍຂອງນັກສຶກສາສາຍເສດຖະສາດການເມືອງເທົ່ານັ້ນ',
        successTitle: 'ເຂົ້າສູ່ລະບົບສຳເລັດ',
        successDescription: 'ຍິນດີຕ້ອນຮັບ!',
        errorTitle: 'ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ',
        errorDescription: 'ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.',
    },
    dashboard: {
        welcomeMessage: 'ຍິນດີຕ້ອນຮັບທຸກທ່ານເຂົ້າສູ່ ແອັບບັນທຶກຂໍ້ມູນ ແລະ ບັນທຶກລາຍຮັບ-ລາຍຈ່າຍ ຂອງນັກສຶກສາ ປຕ ສາຍ ເສດຖະສາດ ແລະ ຄຸ້ມຄອງເສດຖະກິດ',
        studentsCard: {
            title: 'ຂໍ້ມູນນັກສຶກສາ',
            description: 'ຈັດການຂໍ້ມູນນັກສຶກສາ 31 ຄົນ',
        },
        incomeCard: {
            title: 'ລາຍຮັບ',
            description: 'ບັນທຶກ ແລະ ຕິດຕາມລາຍຮັບ',
        },
        expensesCard: {
            title: 'ລາຍຈ່າຍ',
            description: 'ບັນທຶກ ແລະ ຕິດຕາມລາຍຈ່າຍ',
        },
        reportsCard: {
            title: 'ລາຍງານ',
            description: 'ສະຫຼຸບລາຍຮັບ-ລາຍຈ່າຍ',
        },
        searchCard: {
            title: 'ຄົ້ນຫາຂໍ້ມູນ',
            description: 'ຄົ້ນຫາຂໍ້ມູນທັງໝົດທີ່ບັນທຶກໄວ້ໃນແອັບພລິເຄຊັນ.',
            placeholder: 'ພິມເພື່ອຄົ້ນຫາຂໍ້ມູນນັກສຶກສາ, ລາຍຮັບ, ຫຼື ລາຍຈ່າຍ...',
        },
        addIncomeButton: 'ເພີ່ມລາຍຮັບ',
        addExpenseButton: 'ເພີ່ມລາຍຈ່າຍ',
    }
};

const zh: Translation = {
    mainNav: {
        dashboard: '仪表板',
        students: '学生信息',
        income: '收入',
        expenses: '支出',
        reports: '报告',
    },
    secondaryNav: {
        share: '分享应用',
        feedback: '反馈',
        rate: '评价应用',
        about: '关于应用',
    },
    logout: '登出',
    menu: '菜单',
    share: {
        title: 'Sedthasard App',
        text: '看看这个有趣的财务追踪应用！',
        errorTitle: '分享失败',
        errorDescription: '此时无法分享应用。',
        notSupportedTitle: '不支持',
        notSupportedDescription: '您的浏览器不支持分享。',
    },
    feedback: {
        title: '发送反馈',
        description: '我们很想听听您的想法！请告诉我们您对这个应用的看法。',
        label: '反馈',
        placeholder: '在这里写下您的反馈...',
        cancel: '取消',
        submit: '提交',
        thanksTitle: '感谢您的反馈！',
        thanksDescription: '我们已收到您的反馈。'
    },
    rating: {
        title: '评价应用',
        description: '您对这个应用满意吗？',
        placeholder: '告诉我们更多关于您的体验（可选）',
        cancel: '取消',
        submit: '提交评分',
        thanksTitle: '感谢您的 {rating} 星评价！',
        thanksDescription: '感谢您帮助我们改进。',
    },
    about: {
        title: '关于应用',
        description: '这是“Sedthasard App”，旨在为政治经济与经济管理专业的学生记录数据和财务。',
        developerInfo: '开发者信息',
        name: 'Somvang Pingsanijai 先生',
        close: '关闭',
    },
    login: {
        title: 'Sedthasard App',
        passwordPlaceholder: '输入密码（电话号码）',
        loginButton: '登录',
        backgroundButton: '选择背景图片',
        footer: '此应用仅用于记录政治经济学专业学生的数据和收支。',
        successTitle: '登录成功',
        successDescription: '欢迎！',
        errorTitle: '密码错误',
        errorDescription: '请重试。',
    },
    dashboard: {
        welcomeMessage: '欢迎使用政治经济与经济管理专业学生数据记录与收支追踪应用。',
        studentsCard: {
            title: '学生信息',
            description: '管理31名学生的数据',
        },
        incomeCard: {
            title: '收入',
            description: '记录和追踪收入',
        },
        expensesCard: {
            title: '支出',
            description: '记录和追踪支出',
        },
        reportsCard: {
            title: '报告',
            description: '收支总结',
        },
        searchCard: {
            title: '搜索数据',
            description: '搜索应用程序中保存的所有数据。',
            placeholder: '输入以搜索学生、收入或支出...',
        },
        addIncomeButton: '添加收入',
        addExpenseButton: '添加支出',
    }
};

const vi: Translation = {
    mainNav: {
        dashboard: 'Bảng điều khiển',
        students: 'Thông tin sinh viên',
        income: 'Thu nhập',
        expenses: 'Chi phí',
        reports: 'Báo cáo',
    },
    secondaryNav: {
        share: 'Chia sẻ ứng dụng',
        feedback: 'Phản hồi',
        rate: 'Đánh giá ứng dụng',
        about: 'Về ứng dụng',
    },
    logout: 'Đăng xuất',
    menu: 'Thực đơn',
    share: {
        title: 'Sedthasard App',
        text: 'Hãy xem ứng dụng theo dõi tài chính thú vị này!',
        errorTitle: 'Chia sẻ thất bại',
        errorDescription: 'Không thể chia sẻ ứng dụng vào lúc này.',
        notSupportedTitle: 'Không hỗ trợ',
        notSupportedDescription: 'Trình duyệt của bạn không hỗ trợ chia sẻ.',
    },
    feedback: {
        title: 'Gửi phản hồi',
        description: 'Chúng tôi rất muốn nghe ý kiến của bạn! Vui lòng cho chúng tôi biết bạn nghĩ gì về ứng dụng này.',
        label: 'Phản hồi',
        placeholder: 'Viết phản hồi của bạn ở đây...',
        cancel: 'Hủy',
        submit: 'Gửi',
        thanksTitle: 'Cảm ơn phản hồi của bạn!',
        thanksDescription: 'Chúng tôi đã nhận được phản hồi của bạn.'
    },
    rating: {
        title: 'Đánh giá ứng dụng',
        description: 'Bạn hài lòng với ứng dụng này đến mức nào?',
        placeholder: 'Cho chúng tôi biết thêm về trải nghiệm của bạn (tùy chọn)',
        cancel: 'Hủy',
        submit: 'Gửi đánh giá',
        thanksTitle: 'Cảm ơn bạn đã đánh giá {rating} sao!',
        thanksDescription: 'Cảm ơn bạn đã giúp chúng tôi cải thiện.',
    },
    about: {
        title: 'Về ứng dụng',
        description: 'Đây là "Ứng dụng Sedthasard", được tạo để ghi lại dữ liệu và tài chính cho sinh viên chuyên ngành Kinh tế chính trị và Quản lý kinh tế.',
        developerInfo: 'Thông tin nhà phát triển',
        name: 'Ông Somvang Pingsanijai',
        close: 'Đóng',
    },
    login: {
        title: 'Sedthasard App',
        passwordPlaceholder: 'Nhập mật khẩu (số điện thoại)',
        loginButton: 'Đăng nhập',
        backgroundButton: 'Chọn ảnh nền',
        footer: 'Ứng dụng này chỉ dùng để ghi lại dữ liệu và thu chi cho sinh viên Kinh tế Chính trị.',
        successTitle: 'Đăng nhập thành công',
        successDescription: 'Chào mừng!',
        errorTitle: 'Sai mật khẩu',
        errorDescription: 'Vui lòng thử lại.',
    },
    dashboard: {
        welcomeMessage: 'Chào mừng bạn đến với Ứng dụng ghi dữ liệu và theo dõi thu chi cho sinh viên chuyên ngành Kinh tế chính trị và Quản lý kinh tế.',
        studentsCard: {
            title: 'Thông tin sinh viên',
            description: 'Quản lý dữ liệu của 31 sinh viên',
        },
        incomeCard: {
            title: 'Thu nhập',
            description: 'Ghi lại và theo dõi thu nhập',
        },
        expensesCard: {
            title: 'Chi phí',
            description: 'Ghi lại và theo dõi chi phí',
        },
        reportsCard: {
            title: 'Báo cáo',
            description: 'Tóm tắt thu chi',
        },
        searchCard: {
            title: 'Tìm kiếm dữ liệu',
            description: 'Tìm kiếm tất cả dữ liệu được lưu trong ứng dụng.',
            placeholder: 'Nhập để tìm kiếm sinh viên, thu nhập hoặc chi phí...',
        },
        addIncomeButton: 'Thêm thu nhập',
        addExpenseButton: 'Thêm chi phí',
    }
};

const th: Translation = {
    mainNav: {
        dashboard: 'แดชบอร์ด',
        students: 'ข้อมูลนักศึกษา',
        income: 'รายรับ',
        expenses: 'รายจ่าย',
        reports: 'รายงาน',
    },
    secondaryNav: {
        share: 'แชร์แอป',
        feedback: 'ข้อเสนอแนะ',
        rate: 'ให้คะแนนแอป',
        about: 'เกี่ยวกับแอป',
    },
    logout: 'ออกจากระบบ',
    menu: 'เมนู',
    share: {
        title: 'Sedthasard App',
        text: 'ลองดูแอปติดตามการเงินที่น่าสนใจนี้สิ!',
        errorTitle: 'การแชร์ล้มเหลว',
        errorDescription: 'ไม่สามารถแชร์แอปได้ในขณะนี้',
        notSupportedTitle: 'ไม่รองรับ',
        notSupportedDescription: 'เบราว์เซอร์ของคุณไม่รองรับการแชร์',
    },
    feedback: {
        title: 'ส่งข้อเสนอแนะ',
        description: 'เราอยากฟังความคิดเห็นของคุณ! โปรดบอกเราว่าคุณคิดอย่างไรกับแอปนี้',
        label: 'ข้อเสนอแนะ',
        placeholder: 'เขียนข้อเสนอแนะของคุณที่นี่...',
        cancel: 'ยกเลิก',
        submit: 'ส่ง',
        thanksTitle: 'ขอบคุณสำหรับข้อเสนอแนะ!',
        thanksDescription: 'เราได้รับข้อเสนอแนะของคุณแล้ว'
    },
    rating: {
        title: 'ให้คะแนนแอป',
        description: 'คุณพอใจกับแอปนี้มากแค่ไหน?',
        placeholder: 'บอกเราเพิ่มเติมเกี่ยวกับประสบการณ์ของคุณ (ไม่บังคับ)',
        cancel: 'ยกเลิก',
        submit: 'ส่งคะแนน',
        thanksTitle: 'ขอบคุณสำหรับ {rating} ดาว!',
        thanksDescription: 'ขอบคุณที่ช่วยเราปรับปรุง',
    },
    about: {
        title: 'เกี่ยวกับแอป',
        description: 'นี่คือ "แอป Sedthasard" สร้างขึ้นเพื่อบันทึกข้อมูลและการเงินสำหรับนักศึกษาสาขาเศรษฐศาสตร์การเมืองและการจัดการเศรษฐกิจ',
        developerInfo: 'ข้อมูลนักพัฒนา',
        name: 'นายสมหวัง ปิงสนิใจ',
        close: 'ปิด',
    },
    login: {
        title: 'Sedthasard App',
        passwordPlaceholder: 'ป้อนรหัสผ่าน (หมายเลขโทรศัพท์)',
        loginButton: 'เข้าสู่ระบบ',
        backgroundButton: 'เลือกภาพพื้นหลัง',
        footer: 'แอปนี้ใช้สำหรับบันทึกข้อมูลและรายรับ-รายจ่ายสำหรับนักศึกษาเศรษฐศาสตร์การเมืองเท่านั้น',
        successTitle: 'เข้าสู่ระบบสำเร็จ',
        successDescription: 'ยินดีต้อนรับ!',
        errorTitle: 'รหัสผ่านไม่ถูกต้อง',
        errorDescription: 'โปรดลองอีกครั้ง',
    },
    dashboard: {
        welcomeMessage: 'ยินดีต้อนรับสู่แอปบันทึกข้อมูลและติดตามรายรับ-รายจ่ายสำหรับนักศึกษาสาขาเศรษฐศาสตร์การเมืองและการจัดการเศรษฐกิจ',
        studentsCard: {
            title: 'ข้อมูลนักศึกษา',
            description: 'จัดการข้อมูลนักศึกษา 31 คน',
        },
        incomeCard: {
            title: 'รายรับ',
            description: 'บันทึกและติดตามรายรับ',
        },
        expensesCard: {
            title: 'รายจ่าย',
            description: 'บันทึกและติดตามรายจ่าย',
        },
        reportsCard: {
            title: 'รายงาน',
            description: 'สรุปรายรับ-รายจ่าย',
        },
        searchCard: {
            title: 'ค้นหาข้อมูล',
            description: 'ค้นหาข้อมูลทั้งหมดที่บันทึกไว้ในแอปพลิเคชัน',
            placeholder: 'พิมพ์เพื่อค้นหานักศึกษา รายรับ หรือรายจ่าย...',
        },
        addIncomeButton: 'เพิ่มรายรับ',
        addExpenseButton: 'เพิ่มรายจ่าย',
    }
};

export const translations: { [key: string]: Translation } = {
    lo,
    en,
    zh,
    vi,
    th,
};
