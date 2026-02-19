// 1 blogs

/**
 * 转义：
 * 反斜杠：\\\\
 * 括号：\\[ \\] \\{ \\}
 * 管道符号：\\|
 * \\^
 */


var blogs = [
    {
        type: "blog",
        id: "",
        date: "2026-02-18",
        authors: [
            { user: USERS.BLOG_OWNER }
        ],
        title: "My First Post",
        topics: [],
        contents: [
            "[ This is a blog space for sharing thoughts, ideas, and experiences.Feel free to explore and contribute!] ",
            "[This blog was created on c[i[February 18 2026]i]c.]",
            "[To seek information, please visit <a href='https://github.com/QuartzQuincy2019'>@QuartzQuincy2019</a>]",
            "[Press key c[C]c or click the button to change the theme.]",
            "<button value='Change Theme' onclick='changeTheme();'>Change Theme</button>"
        ]
    },
    {
        type: "blog",
        id: "",
        date: "2026-01-16",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VLambda24, role: ROLES.CoAuthor }
        ],
        title: "关于哥伦比娅•希珀塞莱尼娅",
        topics: ["原神", "哥伦比娅", "空月之歌"],
        contents: [
            "[可能含剧透吧，但影响不大。]",
            "[我见过很多二次元角色的名字，而这个哥伦比娅•希珀塞莱尼娅是我见到过的最典雅而优美的。《原神》角色哥伦比娅，即「少女」哥伦比娅，“少女”为代号，对应英文为“The Damselette”。其中damselette为合成词，由damsel+(-ette)合成。damsel意为“小姑娘”，而-ette为表示小的后缀(diminutive ending)。因此damselette直译“小姑娘”。]",
            "[而有关于哥伦比娅·希珀塞莱妮娅，我指的是英文名，准确来讲是拉丁名。详见原文：]",
            "[s[i[Columbina Hyposelenia]i]s]",
            "[古典拉丁语复原读音：/ko'lumbina hyposɛ'lɛnia/]",
            "h1[一、名前の解析]h1",
            "h2[pre.有关ñ的误解]h2",
            "[第一次碰见这个名字，Columbina翻译成“哥伦比娅”，我以为是借用了西班牙语的字母ñ（/ɳ/），导致汉语音译成“娅”而非“娜”。比较厄尔尼诺El Niño，西班牙语Español。以及桑多涅Sandrone，我也以为是ñ，虽然如果是ñ的话音译将极其准确，但其实不是。][我不知道为什么将Columbina音译成“哥伦比娅”，就像不知道Furina为什么被音译成“芙宁娜”一样，这里面的“娅”和“宁”从原语言（意大利语、法语）音素上来说是不准确的。][也许是借鉴了国名“哥伦比亚”Colombia吧，毕竟这个音译是准确的，而且读起来更顺口。如果是“伦比娜”的话，也许(Lu)N-B(i)-N(a)比较绕，把N去掉就不绕了，因为“娅”的声母/j/与前一个字“比”的韵母/i/由于舌位相同而形成了自然过渡。][但是“芙宁娜”两个N连在一起，难道不绕吗？我不明白。2年前我说过芙宁娜建议改成“弗希娜”，芙卡洛斯建议改成“弗松龙”（笑）。]",
            "h2[a.前半部分Columbina]h2",
            "[源自拉丁语columba, -ae“鸽子”，同源词有其阳性人名变体Columbus“哥伦布”，Colomb“库仑”/电荷量单位，以及Columbus之地名变体Colombia“哥伦比亚（南美洲国家，-ia为阴性地名后缀）”。添加派生后缀-inus, a, um“与……有关的”，即columbina（阴性）“鸽子的，与鸽子有关的”。]",
            "h2[b.后半部分Hyposelenia]h2",
            "[典型词根hypo-，源自古希腊语，“低，下”，派生词如hypothesis“假设”。其反义词根为hyper-，即upper，“向上，超过”，如hyperlinks“超链接”，hyperventilation“过度换气”。词根selenia，源自古希腊月亮女神Selene塞勒涅，同词根的有Selenium“硒元素”，塞勒涅对应罗马月亮女神Luna露娜。][不要混淆另一个英语词汇serene“宁静的”，来自拉丁语serenus, a, um清楚的，明亮的，宁静的，同源英语单词有serenade“小夜曲”。]",
            "[游戏台词，节选自第六幕：]",
            "bq[[s[哥伦比娅]s][谢谢你们，我的朋友。多亏你们，我才得到了自己的「名字」。][s[奈芙尔]s][哥伦比娅·希珀塞莱尼娅。后半部分是你自己取的吗？][s[哥伦比娅]s][没错，意为…][s[菈乌玛]s][「诞生于月下的」。][s[哥伦比娅]s][嗯，还可延伸为「诞生于此世界之下的」。][s[「仆人」]s][是个好名字。]]bq",
            "[整个名字一个来自古罗马，一个来自古希腊，这个名字因此获得了它的最明显的特色——古典美感。有如此古典美感的名字是不多见的。]",
            "h2[c.哥伦比娅的主题曲有一句]h2",
            "[q[O cara filia lunae]q]",
            "[q[/o kara filia lunai/]q]",
            "[叹词O/形容词阴性呼格单数cara“亲爱的”/名词阴性呼格单数filia“女儿”/形容词阴性属格单数lunae“月亮的”。]",
            "[直译“哦！月亮的亲爱的女儿/月之爱女。”][拉丁语语序自由。其中cara向后修饰filia，lunae向前限定filia，一前一后，突出中间的filia，亦给人包围之感。月神崇拜者称呼亲爱的cara，以及月之所属lunae，前后紧紧包裹着珍惜的filia，众星拱月的同时又写出月之女儿的脆弱。][补充：希腊语有φιλία，这是个名词，意为“友爱”“爱”。现代希腊语对这个词的读法是/fi.ˈli.a/，这和拉丁语古典式发音的filia（女儿）相同。]",
            "h2[d.音素影响]h2",
            "[Columbina中，C和b是硬的，l、m和n是软的，软硬交替。Hyposelenia中，p是硬的，H、l、n是软的，s是中性的，软硬交替。][软硬交替，富有韵律感，流畅自然。而Columbina Hyposelenia整体偏向软的，契合女名柔和的一般特征（对比男名Gaius Ilius Caesar盖乌斯•尤里乌斯•凯撒，男名Octavius屋大维，男名Nicador尼卡多尔，男名Pompeius庞贝/庞培，Augustus奥古斯都(斯)，Peter彼得）。]",
            "h1[二、人物のイメージ]h1",
            "[没有文采，这一段不写了，自己看图。]",
            "h1[三、音楽と歌詞]h1",
            "[主旋律，即后半段旋律，同挪德卡莱主题曲旋律。主题曲旋律下行，沉郁绵长，但是音色空灵，能够营造一种凄凉宁静之感。][而少女主题曲有其独有旋律，在前半部分。该段旋律轻盈俏皮可爱，如同水珠在水面上有节奏地跳跃，起起伏伏，富有动感。][下面是歌词，语种为拉丁语，附语法分析]",
            "[乐段1]",
            "bq[[①Dormi cara columbula,][睡吧，亲爱的小鸽子]]bq[(dormīre,第四变位法)命令式单数-adj.阴性主格单数-n.阴性主格单数]",
            "bq[[②O columbula mea.][哦，我的小鸽子]]bq[叹词-n.阴性呼格单数-adj.阴性呼格单数]",
            "bq[[Splendeat fenestra,][在窗棂边闪耀]]bq[v.(splendēre,第二变位法)现在时虚拟式第三人称单数主动态-n.阴性夺格单数（方位夺格）]",
            "bq[[adsint somnia flora.][仿佛花儿就是（你的）梦]]bq[v.(adsum)现在时虚拟式第三人称单数主动态-n.中性主格复数-*n.阴性主格单数]",
            "[乐段2]",
            "bq[[O cara filia lunae.][哦，月亮的爱女]]bq[叹词-adj.阴性呼格单数-n.阴性呼格单数-n.阴性属格单数]",
            "bq[[Neve plumam pulvis foedet tuam.][不要让尘土玷污你的羽毛]]bq[连词-n.阴性宾格单数-n.阳性主格单数-v.(foedere,第三变位法)现在时虚拟式第三人称单数主动态-adj.阴性宾格单数][祈愿句，使用虚拟式。]",
            "bq[[Nec iam complexum dabat alma.][（尽管）慈爱的（她）已不再［给予］拥抱]]bq[连词-副词-n.阳性宾格单数-adj.阴性主格单数（此句缺乏或省略一个动词）]",
            "bq[[Capias bona somnias[{alert}s]s a luna.][（也只）愿你（能）从月亮那里得到美梦]]bq[v.(capere,第三变位法i词干)现在时虚拟式第二人称单数主动态-adj.中性宾格复数-n.中性宾格复数-介词-n.阴性夺格单数][祈愿句，采用虚拟式。]",
            "bq[[此句s[{emphasis}somnias]s有语法错误。][若不做改动，则为v.(somniāre)现在时陈述式第二人称单数主动态，与上一个动词capias虚拟式不匹配，且句子v[{alert}缺乏宾语]v（愿你有-美好的-你做梦-从月亮），无法翻译。][若改为somnia，则为n.中性宾格复数，bona修饰somnia，somnia作capias的宾语，整个句子（愿你有-美好的-梦-从月亮）具有含义“愿你从月亮那里得到美梦”。]]bq",
            "[Quincy的续写]",
            "bq[[i[1 in floribus ambulat,]i][i[2 pulchra claraque est.]i]",
            "[i[3 timeo ne accusetur ea,]i][i[4 vereor ne lacrimet illa.]i]",
            "[i[5 ea nos a luna somniet,]i][i[6 sedens supra astra.]i]]bq",
            "[其中1用了方位夺格，3和4用了恐惧从句，5用了祈愿虚拟，6用了一个现在主动分词。]",
            "h1[四、締め括りと後書き]h1",
            "[这一位角色，绝对是设计者投入大量心血的。从衣着到名字到音乐都很有推敲之处，给人多感官方面的审美冲击。][是不是连月卡图案也换掉了？]",
            "h2[关于拉丁语古典发音的r]h2",
            "[这个r和西班牙语的r、俄语的p是一样的，都是齿龈颤音（俗称大舌音）。说实话我4年前练的大舌音，用力部位和舌位出现了问题，导致今天在拉丁语的词尾的r，比如amor, amabantur, 以及词中的单r，如dormi，cetera发音漏气。我跟其他人发的大舌音比较，我发的始终漏气（夹杂h在里面，总觉得在发t）。纠正舌位之后就不漏气了。]"
        ]
    },
    {
        type: "blog",
        id: "",
        date: "2025-10-31",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VLambda24, role: ROLES.CoAuthor },
            { user: USERS.VDelta46, role: ROLES.CoFirstAuthor }
        ],
        title: "挪德卡莱主题曲",
        topics: ["原神", "挪德卡莱", "拉丁语", "空月之歌", "HoYo-Mix"],
        contents: [
            "bq[[A luna, cara cantica][月亮啊][亲爱的歌谣啊]]bq[（interj. f.Voc.sing., adj.f.Voc.pl. f.Voc.pl.）]",
            "bq[[ne me in atra dedas][不要将我交付于黑暗]]bq[（adv. pron.Acc.sing. \\[prep. n.Abl.sing.\\]  v.Subj.Pres.2sing.Act. 否定词+虚拟式表示禁令）]",
            "bq[[Aves, ex urbe aurea][群鸟啊][从金色的城邦]]bq[（f.Voc.pl., \\[prep. f.Abl.sing. adj.f.Abl.sing.\\] 分离夺格）]",
            "bq[[ferte indicia mea][传递我的讯息吧]]bq[（v.Impe.pl. n.Acc.pl. adj.n.Acc.pl. 命令式）]",
            "bq[[Aves, ferte cantam<cantum> cara<carum>][群鸟啊][带去（我）珍爱的歌谣]bq][（f.Voc.pl., v.Impe.pl. m.Acc.sing. adj.m.Acc.sing. 命令式）]",
            "bq[[ut lugeam et fata mala][为了哀悼（我）悲惨的命运]]bq[（\\[conj. v.Subj.Pres.1sing.Act. n.Acc.pl. adj.Acc.pl.\\] ut引导目的状语从句+虚拟式）]",
            "bq[[num in immundorum terra][是否][在污秽（之人们）的土地上]]bq[（adv. \\[prep. adj.m.Gen.pl. f.Abl.sing.\\] 方位夺格）]",
            "bq[[clavus ille adhuc claudit pia][那赘瘤][仍封锁着虔心]]bq[（m.Nom.sing. pron.Nom.sing. adv. v.Indi.Pres.3sing.Act. adj.n.Acc.pl.）]",
            "bq[[quando tandem carebimus tanta miseria][究竟何时][我们才能摆脱这般苦难]]bq[（\\[adv. adv.\\] v.Indi.Futu.1pl.Act. adj.f.Abl.sing. f.Abl.sing. carēre+名词夺格，摆脱）]",
            "bq[[quom patria vastata nunc iacet sub urticis?][当故土被夷平][如今倾颓于荨麻之下？]]bq[（\\[adv. f.Nom.sing. PPP.f.Nom.sing. adv. v.Indi.Pres.3sing.Act. prep. f.Abl.pl.\\] 方位夺格）]",
            "bq[[ubi es, benigna domina?][你在哪里][慈爱的女主人？]]bq[（pron. v.Indi.Pres.2sing.Act., adj.f.Voc.sing. f.Voc.sing.）]",
            "bq[[cur non mittis lucem almam tuam?][为何不降下你的慈爱之光？]]bq[（adv. adv. v.Indi.Pres.2sing.Act. f.Acc.sing. adj.f.Acc.sing. adj.f.Acc.sing.）]",
            "bq[[ecce! terra infelix atra][看啊][黑暗的、不幸的大地]]bq[（interj.! f.Nom.sing. adj.f.Nom.sing. adj.f.Nom.sing.）]",
            "bq[[veritas contra falsa nequit][真理无力抵抗虚伪]]bq[（f.Nom.sing. prep. n.Acc.pl. v.Indi.Pres.3sing.Act.）]",
            "bq[[luna domina, quo adduces?][女主人啊][你要（将我们）引向何方？]]bq[（adj.f.Voc.sing. f.Voc.sing., adv. v.Indi.Futu.2sing.Act.?）]",
            "bq[[pergemus quocumque adduces][无论你（将我们）引向何方][我们都将前行]]bq[（v.Indi.Futu.1pl.Act. adv. v.Indi.Futu.2sing.Act.）]",
            "bq[[potius nox tegat lumina][宁可][让黑夜遮蔽光明]]bq[（adv. f.Nom.sing. v.Subj.Pres.3sing.Act. n.Acc.pl. potius+虚拟语气表示“宁愿”）]",
            "bq[[quam in falsa luce esse][不愿][在虚假的光明中生存]]bq[（adv. prep. adj.f.Abl.sing. f.Abl.sing. v.Infi.Pres.Act. quam+不定式表示“也不”）]",
            "bq[[carmen triste nos non canimus][我们不颂唱悲伤的歌谣]]bq[（n.Acc.sing. adj.n.Acc.sing. pron.Nom.pl. adv. v.Indi.Pres.1pl.Act）]",
            "bq[[esti flentes pro nostrorum malo][尽管我们在为族辈的不幸悲泣]]bq[（conj. PPA.m./f.Nom.pl. prep. adj.Gen.pl. n.Abl.sing. pro+原因夺格表示目的）]",
            "bq[[sed non lacrima tollit dura][然而][眼泪无法消除困境]]bq[（conj. adv. f.Nom.sing. v.Indi.Pres.3sing.Act. n.Acc.pl.）]",
            "bq[[patria somno non potest reddi][沉睡的故土][亦无法被归还]]bq[（f.Nom.sing. m.Abl.sing. adv. v.Indi.Pres.3sing.Act. v.Inf.Pres.Pas. 伴随夺格，possum+不定式表示能够）]",
            "bq[[illa vincta fuit pressa][她已被束缚][她已被压迫]]bq[（pron.f.Nom.sing. PPP.f.Nom.sing. v.Indi.Perf.3sing.Act. PPP.f.Nom.sing.）]",
            "bq[[tecta aurea voravit flamma][火焰吞噬黄金的殿宇]]bq[（n.Acc.pl. adj.n.Acc.pl. v.Indi.Pres.3sing.Act. f.Nom.sing.）]",
            "bq[[sed renascetur rursum][但她将再次重生]]bq[（conj. v.\\[Dep.\\]Indi.Futu.3sing.Pas. adv.）]",
            "bq[[redibit nos larem ducet spe][她将归来][以希望][引领我辈返回家园]]bq[（v.Indi.Futu.3sing.Act. pron.Acc.pl. m.Acc.sing. v.Indi.Futu.3sing.Act. f.Abl.sing. 方式夺格）]",
            "bq[[cur aerumnosae?][（我们）为何饱经风霜？]]bq[（adv. adj.f.Nom.pl.）]",
            "bq[[cui aerumnosae?][（我们）为谁饱经风霜？]]bq[（pron.Dat.sing. adj.f.Nom.pl.）]",
            "bq[[cur lacrimosae?][（我们）为何泪流满面？]]bq[（adv. adj.f.Nom.pl.）]",
            "bq[[cui lacrimosae?][（我们）为谁泪流满面？]]bq[（pron.Dat.sing. adj.f.Nom.pl.）]",
            "bq[[luna, claras terras lustra][月亮啊][将大地照亮]]bq[（f.Voc.sing., adj.f.Acc.pl. f.Acc.pl. v.Impe.sing.）]",
            "bq[[sicut aves per umbras vola][如同群鸟穿越阴翳]]bq[（conj. f.Nom.pl. prep. f.Acc.pl. v.Impe.sing.）]",
            "bq[[et unda vasta foeda purga][如同以巨浪涤净污秽]]bq[（conj. f.Abl.sing. adj.Abl.sing. adj.n.Acc.pl. v.Impe.sing. 方式夺格）]",
            "bq[[pro turba fida][为忠诚的人们]]bq[（prep. f.Abl.sing. adj.f.Abl.sing.  pro+夺格表目的）]",
            "bq[[spem crastinam serva][呵护明日的希望]]bq[（f.Acc.sing. adj.f.Acc.sing. v.Impe.sing.）]",
            "bq[[a luna nova, surgat luna pura casta][纯洁的新月啊][升起吧]]bq[（interj. f.Voc.sing. adj.f.Voc.sing., v.Subj.Pres.3sing.Act. f.Nom.sing. adj.f.Nom.sing. adj.f.Nom.sing.）]",
            "bq[[fugio aerumnam,  tecum nulla fleta][离忧伴汝][泣涕不再]]bq[（v.Indi.Pres.1sing.Act. f.Acc.sing.,  pron.Dat.2sing.+prep. adj.f.Nom.sing. PPP.f.Nom.sing.）]",
            "bq[[sub luna rursus fiet clara terra ][于月光下][大地重归光明]]bq[（prep. f.Abl.sing. adv. v.Indi.Futu.3sing.Act. adj.f.Nom.sing. f.Nom.sing.）]",
            "h2[标注说明]h2",
            "h3[词性]h3",
            "[adj.形容词    adv.副词    v.动词  v.\\[Dep.\\]异相动词    interj.感叹词   prep.介词   conj.连词   pron.代词]",
            "h3[性、数、格]h3",
            "[m.阳性    f.阴性  n.中性  sing.单数   pl.复数]",
            "[1/2/3 第一/二/三人称]",
            "[Nom.主格\tGen.属格\tAcc.宾格\tDat.与格\tAbl.夺格\tVoc.呼格]",
            "h3[动词变位]h3",
            "[Indi.直陈式\tSubj.虚拟式\tInf.不定式\tImpe.命令式\tPres.现在时\tFutu.将来时\tPerf.完成时]",
            "[Act.主动态\tPas.被动态]",
            "h3[分词形式]h3",
            "[PPP.过去被动分词\tPPA.现在主动分词]"
        ]
    },
    {
        type: "blog",
        id: "",
        date: "1970-01-01",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VDelta702, role: ROLES.CoAuthor },
            { user: USERS.Qolerde, role: ROLES.Contributor },
            { user: USERS.VDelta16, role: ROLES.CoFirstAuthor },
            { user: USERS.VDelta46, role: ROLES.Instructor },
            { user: USERS.VLambda24, role: ROLES.CorrespondingAuthor }
        ],
        title: "测试帖子",
        topics: [],
        contents: [
            "[s[hello, world!]s]^||{c2r2}s[\\\\\\|escape\\|/\\\\]s|&#xe215;|&#xe30d;&#xe30e;&#xe30f|{c2}CB|||{c2}Varkā|\\{c4\\}|c10|||{r2}increase|1004|c[c++]c*3|s560|{r2}s[r2]s|i[Italic]i|||brim|&#xe342;|emphasis|c[F:i[Amīyā]i in]c||$",
            "bq[[“The only true wisdom is in knowing you know nothing.”]<footer>— Socrates</footer>]bq",
            "[456q[I have a dream.]q456]",
            "c[Decoding Succeeded!]c"
        ]
    }
];