import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Scale, 
  MessageSquare, 
  Phone, 
  Calendar, 
  MapPin, 
  Mic, 
  FileText, 
  CheckCircle,
  Star,
  Clock,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Bot,
  Zap,
  Shield,
  ArrowLeft,
  Play
} from "lucide-react";

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stats = [
    { value: "+۵۰۰", label: "پرونده موفق", icon: Award },
    { value: "+۱۰۰۰", label: "کاربر فعال", icon: Users },
    { value: "۲۴/۷", label: "پاسخگویی", icon: Clock },
    { value: "+۵۰", label: "سال تجربه", icon: Scale },
  ];

  const services = [
    { 
      icon: MessageSquare, 
      title: "مشاوره حقوقی", 
      description: "دریافت مشاوره تخصصی از هوش مصنوعی و وکلای مجرب",
      action: "شروع مشاوره"
    },
    { 
      icon: Phone, 
      title: "فریادرسی", 
      description: "کمک فوری در شرایط اضطراری و پرونده‌های فوری",
      action: "درخواست کمک"
    },
    { 
      icon: Calendar, 
      title: "وقت مشاوره حضوری", 
      description: "رزرو آنلاین جلسه حضوری با وکلای مجرب",
      action: "رزرو وقت"
    },
    { 
      icon: MapPin, 
      title: "نقشه یاب حقوقی", 
      description: "یافتن نزدیک‌ترین دفاتر حقوقی و وکلا",
      action: "جستجو در نقشه"
    },
  ];

  const cases = [
    {
      title: "رفع تصرف عدوانی اراضی کشاورزی",
      description: "بازپس‌گیری ۵ هکتار زمین کشاورزی در استان گیلان که به صورت غیرقانونی تصرف شده بود.",
      result: "حکم قطعی خلع ید صادر شد."
    },
    {
      title: "کلاهبرداری رمزارز",
      description: "پیگیری پرونده کلاهبرداری در بستر صرافی آنلاین و بازگرداندن سرمایه ۲۰ مالباخته.",
      result: "متهم دستگیر و وجوه مسترد شد."
    },
    {
      title: "طلاق به دلیل عسر و حرج",
      description: "اخذ حکم طلاق برای موکل به دلیل اعتیاد شدید همسر و ترک زندگی.",
      result: "حکم طلاق صادر و حضانت فرزندان اخذ شد."
    },
  ];

  const pricingPlans = [
    {
      title: "تنظیم دادخواست",
      originalPrice: "۳۶۰٬۰۰۰",
      price: "۱۸۰٬۰۰۰",
      discount: "۵۰٪ تخفیف",
      features: [
        "پشتیبانی از تمامی انواع دعاوی",
        "تحلیل خودکار پرونده",
        "قالب‌های استاندارد قضایی",
      ]
    },
    {
      title: "تدوین لایحه",
      originalPrice: "۲۴۰٬۰۰۰",
      price: "۱۲۰٬۰۰۰",
      discount: "۵۰٪ تخفیف",
      features: [
        "استناد به مواد قانونی مرتبط",
        "تنظیم ساختار استدلالی",
        "پشتیبانی ۲۴ ساعته",
      ]
    },
    {
      title: "مشاوره حقوقی هوش مصنوعی",
      originalPrice: "۱۶۰٬۰۰۰",
      price: "۸۰٬۰۰۰",
      discount: "۵۰٪ تخفیف",
      features: [
        "پاسخ فوری به سوالات حقوقی",
        "تحلیل پرونده توسط AI",
        "راهکارهای عملی",
      ]
    },
    {
      title: "مشاوره حقوقی تلفنی",
      originalPrice: "۴۰۰٬۰۰۰",
      price: "۲۰۰٬۰۰۰",
      discount: "۵۰٪ تخفیف",
      features: [
        "پاسخ فوری از طریق تماس تلفنی",
        "اتصال مستقیم به کارشناس حقوقی",
        "مناسب برای خانواده، قرارداد، چک و دعاوی",
      ]
    },
  ];

  const testimonials = [
    {
      text: "با تشکر از تیم موسسه حقوقی آرمان که با تخصص و دقت بالا، پرونده مطالبه وجه من را پیگیری کردند. نتیجه بسیار عالی بود.",
      name: "علی محمدی",
      case: "دعوای حقوقی مطالبه وجه"
    },
    {
      text: "فرآیند ثبت شرکت را با سرعت و کیفیت بالا انجام دادند. مشاوره‌های آنلاین بسیار راحت و مفید بود.",
      name: "فاطمه رضایی",
      case: "امور ثبتی شرکت"
    },
    {
      text: "در پرونده کیفری من، وکیل با تجربه و حرفه‌ای عمل کرد. محرمانگی کامل و پاسخگویی سریع از نقاط قوت این مجموعه است.",
      name: "رضا احمدی",
      case: "دعوای کیفری"
    },
  ];

  const faqs = [
    { q: "آیا مشاوره با هوش مصنوعی جایگزین وکیل است؟", a: "خیر، هوش مصنوعی به عنوان ابزار کمکی عمل می‌کند و تمام موارد توسط وکلای متخصص بررسی می‌شود." },
    { q: "چگونه می‌توانم به وکلای سایت اعتماد کنم؟", a: "تمامی وکلای ما دارای پروانه وکالت پایه یک دادگستری هستند و سوابق آنها قابل بررسی است." },
    { q: "آیا اطلاعات پرونده من محرمانه می‌ماند؟", a: "بله، تمامی اطلاعات با رمزنگاری پیشرفته محافظت شده و محرمانگی کامل تضمین است." },
    { q: "هزینه خدمات چگونه محاسبه می‌شود؟", a: "هزینه‌ها بر اساس نوع خدمات و پیچیدگی پرونده تعیین می‌شود و قبل از شروع به شما اعلام خواهد شد." },
    { q: "آیا می‌توانم اسناد حقوقی خود را ویرایش کنم؟", a: "بله، پس از تولید سند می‌توانید آن را ویرایش کرده و نسخه نهایی را دریافت کنید." },
  ];

  const processSteps = [
    { num: "۱", title: "رزرو مشاوره", desc: "تماس تلفنی یا تکمیل فرم آنلاین برای دریافت مشاوره اولیه رایگان" },
    { num: "۲", title: "بررسی پرونده", desc: "تحلیل دقیق پرونده و ارائه راهکارهای حقوقی مناسب توسط وکلای متخصص" },
    { num: "۳", title: "اقدام حقوقی", desc: "پیگیری مرحله‌به‌مرحله تا رسیدن به نتیجه مطلوب با شفافیت کامل" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white" dir="rtl">
      <header className="border-b border-slate-700/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 bg-slate-900/80">
        <div className="container mx-auto px-4 py-4 flex flex-row-reverse items-center justify-between">
          <div className="flex flex-row-reverse items-center gap-3">
            <Scale className="w-8 h-8 text-amber-500" />
            <div className="text-right">
              <h1 className="text-xl font-bold text-white" data-testid="text-logo">موسسه حقوقی آرمان</h1>
              <p className="text-xs text-slate-400">Arman Law Firm</p>
            </div>
          </div>
          <nav className="hidden md:flex flex-row-reverse items-center gap-6 text-sm">
            <a href="#services" className="hover:text-amber-400 transition" data-testid="link-services">خدمات</a>
            <a href="#pricing" className="hover:text-amber-400 transition" data-testid="link-pricing">تعرفه‌ها</a>
            <a href="#cases" className="hover:text-amber-400 transition" data-testid="link-cases">پرونده‌ها</a>
            <a href="#faq" className="hover:text-amber-400 transition" data-testid="link-faq">سوالات</a>
            <Link href="/dashboard" data-testid="link-admin">
              <span className="inline-flex items-center justify-center rounded-md border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer">
                پنل مدیریت
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6" data-testid="badge-ai">
            <Bot className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-amber-400">با وکلای پایه یک دادگستری و هوش مصنوعی پیشرفته</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-white via-amber-100 to-amber-400 bg-clip-text text-transparent" data-testid="text-hero-title">
            مشاوره حقوقی تخصصی
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subtitle">
            خدمات جامع حقوقی، کیفری و امور ثبتی
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input 
                placeholder="مشکل حقوقی خود را بنویسید (هوشمند)"
                className="w-full py-6 px-6 text-lg bg-slate-800/80 border-slate-600 rounded-full text-right pr-6 pl-32"
                data-testid="input-legal-query"
              />
              <Button className="absolute left-2 top-1/2 -translate-y-1/2 bg-amber-500 hover:bg-amber-600 rounded-full" data-testid="button-ai-consult">
                <Bot className="w-5 h-5 ml-2" />
                مشاوره
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" data-testid="button-call">
              <Phone className="w-5 h-5 ml-2" />
              تماس فوری
            </Button>
            <Button size="lg" variant="outline" className="border-slate-500 text-slate-300 hover:bg-slate-700" data-testid="button-office">
              <MapPin className="w-5 h-5 ml-2" />
              دفتر مرکزی موسسه حقوقی آرمان
            </Button>
          </div>

          <Card className="max-w-md mx-auto bg-slate-800/50 border-slate-700 backdrop-blur">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-amber-400">سامانه هوشمند آرمان</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400">سیستم فعال</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">دستیار پیشرفته حقوقی و قضایی</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-slate-400">ظرفیت تحلیل</span>
                <span className="text-amber-400 font-bold">78%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                <div className="bg-gradient-to-l from-amber-400 to-amber-600 h-2 rounded-full" style={{width: '78%'}} />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-amber-400">REQ: 1,245</span>
                <span>➜</span>
                <span>در حال پردازش درخواست‌های حقوقی...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 border-y border-slate-700/50 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center" data-testid={`stat-${i}`}>
                <stat.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">خدمات سریع</h2>
            <p className="text-slate-400">دسترسی آسان به خدمات حقوقی</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 hover:border-amber-500/50 transition group" data-testid={`service-card-${i}`}>
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition">
                    <service.icon className="w-7 h-7 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{service.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                  <Button variant="ghost" className="text-amber-400 hover:text-amber-300 p-0" data-testid={`service-action-${i}`}>
                    {service.action}
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-slate-800/50 to-transparent">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full">ویژگی جدید</span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">دستیار هوشمند دادگاه</h2>
          <p className="text-slate-400 text-center max-w-3xl mx-auto mb-12">
            وکیل همراه شما در لحظه! با دستیار صوتی و متنی دادگاه، صدای قاضی یا طرف مقابل را ضبط کنید و در لحظه بهترین پاسخ حقوقی را دریافت کنید.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">دستیار صوتی (Live)</h3>
                    <p className="text-xs text-slate-400">تحلیل لحظه‌ای صحبت‌های دادگاه و پیشنهاد پاسخ مناسب.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">منبع‌یاب لایحه</h3>
                    <p className="text-xs text-slate-400">یافتن خودکار مواد قانونی مرتبط برای متن دفاعیه شما.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800 border-slate-700 max-w-3xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-amber-400">دستیار دادگاه (Live)</CardTitle>
                <span className="text-xs text-slate-400">شخصیت: وکیل مدافع</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-300 mb-2">
                  <span className="text-amber-400">قاضی گفت:</span> "شما مدرکی برای اثبات مالکیت ارائه نکردید."
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-400">تحلیل حقوقی</span>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">نادرست</span>
              </div>
              <p className="text-sm text-slate-400">
                طبق ماده ۲۲ قانون ثبت، سند رسمی دلیل مالکیت است.
              </p>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <p className="text-sm text-amber-400 mb-2">پاسخ پیشنهادی</p>
                <p className="text-white">
                  جناب قاضی، سند رسمی مالکیت به پیوست پرونده تقدیم شده و طبق ماده ۲۲ قانون ثبت، مالکیت موکل محرز است.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="cases" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">پرونده‌های اقدام شده</h2>
          <p className="text-slate-400 text-center mb-12">مروری بر موفقیت‌های اخیر موسسه حقوقی آرمان</p>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700" data-testid={`case-card-${i}`}>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-white mb-3">{c.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{c.description}</p>
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {c.result}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">سرویس‌های هوشمند حقوقی</h2>
          <p className="text-slate-400 text-center mb-12">خدمات حقوقی با سرعت و دقت هوش مصنوعی و نظارت متخصصین</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPlans.map((plan, i) => (
              <Card key={i} className="bg-slate-800 border-slate-700 hover:border-amber-500/50 transition" data-testid={`pricing-card-${i}`}>
                <CardContent className="pt-6">
                  <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">{plan.discount}</span>
                  <h3 className="font-bold text-white mt-3 mb-2">{plan.title}</h3>
                  <div className="mb-4">
                    <span className="text-slate-500 line-through text-sm">{plan.originalPrice} تومان</span>
                    <div className="text-2xl font-bold text-amber-400">{plan.price} <span className="text-sm">تومان</span></div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">PDF</span>
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">Word</span>
                  </div>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600" data-testid={`pricing-select-${i}`}>
                    انتخاب طرح
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">چرا هوش مصنوعی آرمان؟</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: FileText, title: "نوشتن دادخواست با هوش مصنوعی", features: ["مطابق با آخرین تغییرات قضایی ۱۴۰۳", "راهنمای گام‌به‌گام اختصاصی", "جلوگیری از خطاهای رایج حقوقی"] },
              { icon: Scale, title: "نوشتن لایحه با هوش مصنوعی", features: ["تحلیل خودکار پرونده شما", "استناد به مواد قانونی مرتبط", "قالب‌های دادگاه‌های مختلف"] },
              { icon: Bot, title: "مشاوره حقوقی با هوش مصنوعی", features: ["پاسخ فوری به سوالات حقوقی", "تحلیل پرونده توسط AI", "پیشنهاد بهترین راهکارها"] },
              { icon: Phone, title: "مشاوره حقوقی تلفنی", features: ["مشاوره حقوقی تلفنی فوری", "اتصال مستقیم به کارشناس در کمترین زمان", "مناسب برای خانواده، قرارداد، چک و دعاوی"] },
            ].map((item, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6">
                  <item.icon className="w-10 h-10 text-amber-500 mb-4" />
                  <h3 className="font-bold text-white mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-sm text-slate-400">
                        <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">فرآیند همکاری</h2>
          <p className="text-slate-400 text-center mb-12">سه مرحله ساده تا حل مسئله حقوقی شما</p>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center" data-testid={`process-step-${i}`}>
                <div className="w-16 h-16 rounded-full bg-amber-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">نظرات موکلین</h2>
          <p className="text-slate-400 text-center mb-12">تجربه مشتریان ما از خدمات حقوقی</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700" data-testid={`testimonial-${i}`}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4">«{t.text}»</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                      <Users className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.case}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-800/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">مراجعه حضوری</h2>
              <div className="space-y-4 text-slate-300">
                <p><strong>آدرس دفتر:</strong> تهران، جردن، خیابان طاهری پلاک ۱۸</p>
                <p><strong>ساعات کاری:</strong> شنبه تا پنجشنبه ۹:۰۰ تا ۱۸:۰۰، جمعه تعطیل</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button variant="outline" className="border-slate-600" data-testid="button-balad">مسیریابی با بلد</Button>
                <Button variant="outline" className="border-slate-600" data-testid="button-neshan">مسیریابی با نشان</Button>
                <Button variant="outline" className="border-slate-600" data-testid="button-google-maps">Google Maps</Button>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">رزرو مشاوره آنلاین یا حضوری</h2>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-6 space-y-4">
                  <Input placeholder="نام و نام خانوادگی" className="bg-slate-700 border-slate-600" data-testid="input-name" />
                  <Input placeholder="شماره تماس" className="bg-slate-700 border-slate-600" data-testid="input-phone" />
                  <Button className="w-full bg-amber-500 hover:bg-amber-600" data-testid="button-reserve">
                    رزرو مشاوره
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-4">سوالات متداول</h2>
          <p className="text-slate-400 text-center mb-12">پاسخ به پرسش‌های رایج شما</p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card 
                key={i} 
                className="bg-slate-800/50 border-slate-700 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                data-testid={`faq-${i}`}
              >
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-amber-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  {openFaq === i && (
                    <p className="text-slate-400 mt-4 text-sm">{faq.a}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-right">
              <div className="flex flex-row-reverse items-center gap-3 mb-4">
                <Scale className="w-8 h-8 text-amber-500" />
                <div>
                  <h3 className="font-bold text-white" data-testid="text-footer-logo">موسسه حقوقی آرمان</h3>
                  <p className="text-xs text-slate-400">Arman Law Firm</p>
                </div>
              </div>
              <p className="text-sm text-slate-400">چشم ها را باید شست ، حق را باید دید</p>
            </div>
            <div className="text-right">
              <h4 className="font-bold text-white mb-4">دسترسی سریع</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-amber-400" data-testid="link-footer-home">خانه</a></li>
                <li><a href="#services" className="hover:text-amber-400" data-testid="link-footer-services">خدمات ما</a></li>
                <li><a href="#pricing" className="hover:text-amber-400" data-testid="link-footer-pricing">تعرفه‌ها و خدمات</a></li>
                <li><a href="#" className="hover:text-amber-400" data-testid="link-footer-assistant">دستیار هوشمند</a></li>
              </ul>
            </div>
            <div className="text-right">
              <h4 className="font-bold text-white mb-4">تماس با ما</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li data-testid="text-address">📍 تهران، جردن، خیابان طاهری پلاک ۱۸</li>
                <li data-testid="text-phone">📞 ۰۹۰۲۷۳۷۰۲۶۰</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p data-testid="text-copyright">© ۱۴۰۳ موسسه حقوقی آرمان. تمامی حقوق محفوظ است.</p>
            <p className="mt-2">ساخته شده با ❤️ در ایران</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 left-6 z-50">
        <Button size="lg" className="rounded-full w-14 h-14 bg-amber-500 hover:bg-amber-600 shadow-lg" data-testid="button-chat-ai">
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
