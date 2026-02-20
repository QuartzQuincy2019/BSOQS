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
        date: "2026-01-31",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VLambda24, role: ROLES.CoFirstAuthor }
        ],
        title: "拉丁语的分词系统",
        topics: ["拉丁语"],
        contents: [
            "h1[一、分词系统]h1",
            "[分词，是动词的非限定形式（也叫非谓语形式）之一。在拉丁语中，动词有4个分词。]",
            "h2[1. 分词类别]h2",
            "ol[|现在（主动）分词 Present Participle|将来（主动）分词 Future Participle|完成（被动）分词 Perfect Participle|将来（被动）分词 Gerundive]ol",
            "[四种分词的结尾各不相同。]",
            "ol[|现在（主动）分词 -ns|将来（主动）分词 -ūrus|完成（被动）分词 -tus -sus|将来（被动）分词 -ndus]ol [一般来讲，分词是一种兼具动词、形容词、名词和副词属性的一种动词的形式。而拉丁语的分词可以作为形容词（而且可以有比较级和最高级），也可以直接作为名词来使用（名物化）。而现在主动分词和完成被动分词，经常用作定语。]",
            "h1[1. 现在主动分词 - DOING]h1",
            "[现在分词的表意如同英语中的现在分词（-ing），表示动作正在进行。同时也能作形容词，也能作处于该动作状态的名词。]",
            "bq[[amāns loving, lover][vocāns calling, caller][legentēs reading, readers]]bq",
            "s[现在分词的变格系统]s",
            "[它符合“形容词第三变格-一尾变格”。需要注意的是，当现在分词用作形容词时，其夺格单数结尾常为-ī。用作其他形式的，包括名词，夺格单数结尾常为-e。]",
            "h1[2. 将来主动分词 - ABOUT TO DO]h1",
            "[用于表达一个动作可能或将要发生。]",
            "bq[[rēctūrus about to rule][audītūrus about to hear]]bq [若与系动词esse连用，esse+PFA构成第一迂回变位结构。这也是将来主动分词的主要用法。] bq[[Urbs est cāsūra.][The city is about to fall.][Mānsūrus eram.][I was going to say.]]bq",
            "h2[迂回变位]h2",
            "[广义而言，所有的动词分词与系动词esse连用都称作“迂回变位”。然而，现在分词与系动词连用的情况（类似于英语中be doing）在拉丁语中非常罕见，而完成分词与系动词连用又属于普通动词变位的一部分（类似于英语中be done）。所以，迂回变位的范围就局限到了剩下的两类分词身上：将来（主动）分词和Gerundive（将来被动分词）。]",
            "h3[第一迂回变位]h3",
            "[第一迂回变位（First Periphrastic Conjugation）指的是系动词esse与将来分词连用的结构。它表示“未来发生”或“目的性”的动作。]",
            "bq[[captūrus sum. 我将要拿。][captūrī sumus. 我们将要拿。][audītūrus es. 你将要听。][audītūrī estis. 你们将要听。][monitūrus est. 他将要建议。][monitūrī sunt. 他们将要建议。]]bq",
            "[实际上，脱离迂回变位结构的将来分词直接修饰名词较为少见，然而，后期的作家和诗人使用将来分词修饰实质性名词，常用来表达目的、准备、可能性、确定性和条件的结果。] bq[[ēgreditur castrīs Rōmānus vāllum invāsūrus.][一个罗马人走出军营，准备/意图进攻（敌人）的壁垒。［目的/意图］]]bq",
            "h1[3. 完成被动分词 - DONE]h1]",
            "[一个用法，有时等价于英语中的done作形容词。]",
            "bq[[tēctus 被掩护的，被遮盖的][acceptus 被接受的]]bq [经常，它的含义可以发生引申。] bq[[acceptus 可接受的]]bq [另一个用法，也就是英语中done的普遍用法：构成被动语态变位。] bq[[vocātus est.][He is called.]]bq",
            "h1[4. 将来被动分词(Gerundive) - MUST BE DONE]h1",
            "[这是一个不同于英语的全新分词类型。将来被动分词，或更常称之为「Gerundive」，用于表示动作的被动必要性，表示需求、义务、强制。][Gerundive有时可以用作形容词，表示“必须被……的”（must be done）。][然而，它更常见的用法是Gerundive与esse连用，构成第二迂回变位(Second Periphrastic Conjugation)结构。第二迂回结构的构成与第一迂回变位结构一致。][除了以上用法之外，在与具有以下性质的动作搭配时，Gerundive表示目的：拥有、给予、传递、接受、经历。] bq[[aedem Castoris habuit tuendam.][He had the temple of Castor to take care of. ]]bq [\\[habuit是habere的直陈式完成时第三人称单数主动态形式\\]][不通顺直译：他有一座需要被保护的卡斯托尔的神庙。][通顺译法：他负责保护卡斯托尔的神庙。]",
            "h2[中性Gerundive的无人称(Impersonal)使用]h2",
            "[这是第二迂回变位中的一种特殊和高级用法。与一般情况不同，中性Gerundive的无人称使用要求第二迂回结构中的esse统一使用第三人称单数形式（est, fuit, erit, erat...），或者直接弃用；同时Gerundive使用中性形式。这种用法对动词是否及物没有要求。][对于固定搭配与格宾语或夺格宾语的动词，可以与对应格的名词连用，以使第二迂回结构带上宾语成分，令表意更细致。若要强调动作的逻辑主语，则需将主语变为与格。]",
            "bq[[Pugnāndum est.]]bq",
            "[直译为“存在战斗的必要性”，即“必须战斗”。pugnāndum被当作主语。若要表达“我们必须战斗”，则应加入与格。]",
            "bq[[Nobis pugnāndum est.]]bq",
            "[直译为“对于我们来说，存在战斗的必要性”，即“我们必须战斗”。]",
            "bq[[Lēgibus pārendum est.][The laws must be obeyed.]]bq [parēre意为“遵守”，后接与格宾语。]",
            "bq[[ūtendum exercitātiōnibus modicīs.][We must use moderate exercise.]]bq [ūti意为“使用”，后接夺格宾语。][对于及物动词，可以带上宾格宾语，也能使第二迂回结构带上宾语成分。][以上。简要介绍了拉丁语的4种分词的常见用法。]",
            "h1[二、绝对夺格（又称独立夺格）]h1",
            "[当伴随状语的逻辑主语与主句的主语不一致时，伴随状语可以使用“绝对夺格”结构，表达更高级。绝对夺格类似于英语中的“独立主格 (Nominative Absolute)”结构，绝对夺格也需要至少一个分词和主语对象。]",
            "s[%{emphasis}分词/形容词/名词夺格+名词/代词夺格]s [下面进行举例。]",
            "h2[1. 分词夺格表主语状态]h2",
            "[最常见，最动态。这种结构几乎与英语的独立主格结构完全等同。][若使用现在分词，可以表示独立夺格状态伴随着主句动作一起发生。也可表示原因。]",
            "bq[[Urbe incendente, cives fugierunt.][城市燃烧时，市民们逃脱了。]]bq [urb（【第三变格法】城市）取夺格urbe，incendere（【第三变位法】燃烧，点燃）取现在分词夺格incendente。伴随状语的逻辑主语是“城市”，主句主语是“市民们”。][若使用过去分词，则独立夺格的状态发生在主句动作之前。]",
            "bq[[Urbe incensa, cives fugierunt.][城市烧毁后，市民们逃脱了。]]bq",
            "[urb取夺格urbe，incendere取过去分词夺格incensa。][与英语中独立主格进行联系：]",
            "bq[h3[1. 使用现在分词：]h3",
            "[Dominā tacita sedente, lūna faciem eius illuminābat.][She sitting quietly, the moonlight shone on her face.][她静静地坐着，月光照亮了她的脸。]",
            "h3[2. 使用过去分词：]h3",
            "[Sole ortō, heros iter suum perrexit.][The sun risen, the hero continued his journey.][太阳升起之后，英雄继续了他的征途。]]bq",
            "h2[2. 名词夺格表主语状态]h2",
            "bq[[Cicerōne cōnsule, Catilīnae coniūrātiō patefacta est.][西塞罗担任执政官期间，喀提林的阴谋被揭露了。]]bq",
            "[Cicero（【第三变格法】【男名】西塞罗）取夺格Cicerōne，consul（【第三变格法】执政官）取夺格consule。][主句：Catilīna（【第一变格法】【男名】喀提林）取属格Catilīnae。coniūrātiō，“阴谋”，取主格单数。patefacta est，“被揭露”，陈述语气完成时第三人称单数被动态。][动词patefacio, patefacere, patefecī, patefactum，“揭露”，属于第三I词干变位法动词。由于派生于动词facio, facere, fecī, factum，而后者的现在时体系被动形式变位是不规则的，其现在时体系被动形式变位也不规则。]",
            "h2[3. 形容词夺格表主语状态]h2",
            "bq[[Patre vivō, omnia bona erant.][父亲健在时，一切都是好的。]]bq",
            "[pater（【第三变格法】父亲）取夺格patre。vivus（adj.活着的）取阳性夺格单数vivō。][主句：omnia（所有的东西，一切）取主格omnia，bonus（adj.好的）取中性主格复数bona，sum（是）取陈述语气未完成时第三人称复数主动态。All things were good.",
        ]
    },
    {
        type: "blog",
        id: "",
        date: "2026-01-16",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VLambda24, role: ROLES.CoAuthor },
            { user: USERS.VDelta46, role: ROLES.CoAuthor }
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
            "bq[[Nec iam complexum (dabat) alma.][（尽管）慈爱的（她）已不再［给予］拥抱]]bq[连词-副词-n.阳性宾格单数-adj.阴性主格单数（此句缺乏或省略一个动词）]",
            "bq[[Capias bona somnias[%{alert}s]s a luna.][（也只）愿你（能）从月亮那里得到美梦]]bq[v.(capere,第三变位法i词干)现在时虚拟式第二人称单数主动态-adj.中性宾格复数-n.中性宾格复数-介词-n.阴性夺格单数][祈愿句，采用虚拟式。]",
            "bq[[此句s[%{emphasis}somnias]s有语法错误。][若不做改动，则为v.(somniāre)现在时陈述式第二人称单数主动态，与上一个动词capias虚拟式不匹配，且句子v[%{alert}缺乏宾语]v（愿你有-美好的-你做梦-从月亮），无法翻译。][若改为somnia，则为n.中性宾格复数，bona修饰somnia，somnia作capias的宾语，整个句子（愿你有-美好的-梦-从月亮）具有含义“愿你从月亮那里得到美梦”。]]bq",
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
        date: "2026-01-03",
        authors: [
            { user: USERS.BLOG_OWNER }
        ],
        title: "Epilogue",
        topics: [],
        contents: [
            "[All of humanity shares a common mind and similar ways of life. Five thousand years ago, just like the ancient Egyptians, we honored heaven and earth, farmed the land, hunted, managed floods, developed skills, studied the stars, celebrated festivals, and fought against invaders.]",
            "[Human civilizations have never been separate islands. They are meant to coexist, to blend, and to grow independently. In our turbulent(动荡的) world today, we must hold firm to the idea of \"a community with a shared future for mankind\" and do our part from China to support the progress of all civilizations and the stability of societies worldwide.]",
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
        date: "2025-10-16",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VLambda24, role: ROLES.CoAuthor }
        ],
        title: "初学日语补助动词",
        topics: ["日语"],
        contents: [
            "[补助动词，黏着在本动词「て」形式之后，将本动词表述的含义细腻化。补助动词的使用是一种非常地道的表达。][对于大多数日语初学者来说，第一个接触到的补助动词是「ている」。]",
            "h1[一、表示状态细节：]h1",
            "ul[|[⏩「ている」类似于英语动词的现在分词（doing），表示状态持续。它的敬语是「ておる」。] bq[[🆔飛行機が飛んでいます。（飞机在飞）]]bq[也用于瞬间动词之后，表示结果状态，类比英语动词的过去分词作形容词（done）的用法。]|[⏩「てある」强调人为事先操作后的状态。类比英语动词的过去分词在被动语态完成时的用法。] bq[[🆔ホテルはもう予約してあります 。（酒店已经预约好了。）][🆔もう準備してありますから、安心してください。（已经准备好了，请放心。）]]bq |[⏩「てくる」「ていく」][表示动作或状态在时间上、空间上的来往。][「てくる」……来/到/近/过来，……以来。][「ていく」……去/走/开/离/过去，……下去。] bq[[🆔様々なアイデアが浮かんできた。（各种各样的想法浮现出来了。）][🆔歩いていると、焼き肉のにおいがしてきた。（正走着路，烧肉的味道扑面而来。）][🆔人口がだんだん減っていきます。（人口逐渐减少下去。）][🆔飛行機が飛んでいきました。（飞机飞走了。）]]bq]ul",
            "h1[二、表示动作情感色彩、目的和语气]h1",
            "ul[|⏩「てみる」表示尝试。试试看。|⏩「てみせる」表示这个动作“做给谁看”，展示给谁（看）。|⏩「てしまう」表示动作已经做到彻底、尽头；含遗憾、后悔情绪下的动作；不小心做了不该做的动作；不禁做了动作。它的缩略形式是「ちゃう」|⏩「ておく」表示事先准备好；预先做好。也表放置或放任不管。|⏩「てやる」对同辈或对下级，对物给予。|東京の弟に、今年もふるさとのお土産を送ってやった。（今年也给东京的弟弟送去了故乡的特产）]ul",
            "h1[三、由授受动词派生(N2)]h1",
            "ul[|[⏩「てあげる」「てやる」「て差し上げる」表示我给别人/外物做。]|[⏩「てもらう」「ていただく/て頂く」表示被动承受他人或外部动作的结果。句子的主语是“我”。] bq[[🆔李さんはコーヒーを買ってもらいました。（小李\\[给我\\]买了咖啡。）]]bq |[⏩「てくれる」「てくださる」表示他人为我做某事，带有感激和亲切的语气色彩。句子的主语是施动者。] bq[[🆔誕生日に友だちは漫画をくれました。（生日当天，朋友们给我漫画书。）]]bq [【不尊敬地】q[🆔先生は私に本を買ってv[%{alert}くれました]v。（老师给我买了本书。）]q][【尊敬地】q[🆔先生は私に本を買ってv[%{emphasis}くださいました]v。（老师给我买了本书。）]q]]ul",
            "[附：关于授受动词和它们的补助动词形式：]",
            "[⏩有关“给”的“靠近我”与“远离我”]",
            "t[^|我给妈妈一朵花→あげる|老师给我一本书→くれる||妈妈给老师一本书→あげる|老师给妈妈一本书→くれる||我给老师一本书→あげる|我给别人一本书→あげる||别人给我一本书→くれる|我从别人那里得到一本书→もらう||为我做事我很感激→くれる|别人给予我恩惠→くれる|$]t",
            "h3[总结]h3",
            "ul[|⏩给出并远离「あげる」「差し上げる」，主语为施动者|⏩从别处得到「もらう」「いただく」，主语为承受者|⏩别人给来并使我享有「くれる」「くださる」，主语为施动者]ul",
            "h1[思考：]h1",
            "[日语中的复合动词，我们说这个场儿，一般以「动词A连用形」+「动词B」出现的。比如]",
            "ul[|勝ち取る（赢取）|受け入れる（接受）|飛び込む（飞入）|知り合う（相识）|やり直す（重做）]ul",
            "[我管他“动动复合”。我认为这是最教条的一类。“动动复合”，它像是两个动词的前后合并作为一个复合动作出现，多少体现了一些动作上时间先后的特征。][另外有一类，我叫他“て动复合”。这便是我们今天讨论的“补助动词”和它的本动词。补助动词的用法是「本动词て形+补助动词」（连用形+て+补助动词）。这种复合，尤其是对于补助动词的部分，我认为是对本动词陈述的语气或动作上的补充，起到一个辅助性作用，不像“动动复合”那样不可或缺。][「て」是接续助词，它负责接续动作，拓展之后有了方式、原因、并列和轻微逆接的用法。"
        ]
    },
    {
        type: "blog",
        id: "",
        date: "2025-04-12",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VLambda24, role: ROLES.CoAuthor }
        ],
        title: "某班徽拉丁语解析",
        topics: ["拉丁语"],
        contents: [
            "bq[[verba volant, scripta manent.]]bq",
            "h2[1.极致直译：话飞，写的停留。]h2",
            "h2[2.翻译：从口中说出的字会立即消散，只有亲手写下来的字才会永久留存。（Spoken words fly away, written words remain.）]h2",
            "h2[3.寓意：不要光说不做，要成为一个行动上的巨人。]h2",
            "h2[4.词汇变形解析：]h2",
            "[(i) verba n.II.N.Nom.Pl./第二变格法中性名词主格复数：字]",
            "[(ii) volant v.I.Ind.Act.Pre.3rdPl./第一变位法动词直陈式主动语态现在时第三人称复数：（他们）飞走]",
            "[(iii) scripta v.III.[PPP]N.Nom.Pl./第三变位法动词过去被动分词中性形式主格复数：被写下的]",
            "[(iv) manent v.II.Ind.Act.Pre.3rdPl./第二变位法动词直陈式主动语态现在时第三人称复数：（他们）停留、存留]",
            "h2[5.语法解析：]h2",
            "h3[一、过去被动分词（PPP）修饰名词：]h3",
            "[verba scripta（被写下的字，written words）]",
            "[puella amata（被爱过的女孩，a girl that had been loved）]",
            "h3[二、主语+谓语]h3",
            "[verba volant（字飞走，words fly away）]",
            "[verba manent（字留下来，words remain）]",
            "[nos currimus（我们跑，we run）]",
            "[eum pereebat（他消失了，he disappeared）]"
        ]
    },
    {
        type: "blog",
        id: "",
        date: "2025-02-10",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VLambda24, role: ROLES.CoAuthor }
        ],
        title: "（古典）拉丁语发音要领",
        topics: ["拉丁语", "发音"],
        contents: [
            "[拉丁语字母表（23个，没有J U W）：]",
            "[ABCDEFGHIKLMNOPQRSTVXYZ][abcdefghiklmnopqrstuxyz]",
            "[注：含k的拉丁语词汇极少，其发音与c完全一致]",
            "[拉丁语的字母一般有固定的发音，固定的字母组合也有固定的发音。]",
            "[元音：s[Ae Ee Ii Oo Vu Yy]s（啊，欸，噫，哦，呜，鱼）]",
            "[s[Ii]s在i+元音时，会变成半元音s[/j/]s。如i[iam /jam/，Iūnō /ju:no:/，iactātus /jakta:tus/，huius /hujus/。]i]",
            "bq[[字母“J”在公元9世纪后出现，起初是为了区分词首或辅音位置的“I”。因此如果见到带有字母“j”的拉丁语词汇，其发音为/j/，如“Julius”尤里乌斯，“Janus”雅努斯，“Juno”尤诺（不是朱诺），“Juppiter”尤匹特（不是朱庇特），“Janusapolis”雅努萨珀利斯（）]]bq",
            "[双元音：ae 'eye', au 'ou(t)', ei 'ai(d)', oe 'oi(l)' ,eu /eu/, ui '(q)ui(ck)']",
            "[辅音：Rr为大舌颤音 ；Cc /k/ ；Gg /g/]",
            "[重音：单双音节重音在前。多音节的，如果倒数第二个音节是重读闭音节、或者包含长元音或者双元音，那么重音在倒数第二个音节，否则在倒数第三个音节。例如]",
            "bq[[Caesar: s['Cae]s sar 凯撒br[]",
            "dominus：s['do]s mi nus br[]",
            "rēgīna：rē s['gī]s nabr[]",
            "Centaurus: Cen s['tau]s rusbr[]",
            "ambulāmus: am bu s['lā]s mus]]bq",
            "[还有其他规则，比如-ius/-ium单词的属格和呼格单数重读倒数第二个音节，比如Vergili: Ver 'gī li等，不多赘述。]"
        ]
    },
    {
        type: "blog",
        id: "",
        date: "2024-09-16",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VDelta702, role: ROLES.CoAuthor },
            { user: USERS.VDelta46, role: ROLES.CoAuthor }
        ],
        title: "记甲辰八月十四子时天象",
        topics: ["观星", "秋季大三角", "木星"],
        contents: [
            "bq[[s[记甲辰八月十四子时天象]s][皎皎玉盘攀南天，瑞星逐月羽垒穿，][七斗擎座望帝酒，东升明岁耀人间。]",
            "[（皎洁满月攀上南方夜空，土星穿过羽林军、垒壁阵追逐明月，【南天】北斗七星伏于地平线上托举太微垣与酒杯相望【北天】，木星东升即将照耀人间。【东天】）]]bq",
            "[------------------观星记录---------------]",
            "[观测时间：2024年9月16日（八月十四） 21:00-22:20【东八区】]",
            "[地点：山东省烟台市开发区北部、西北部]",
            "[光污染：较严重][天气：晴→少云][方式：裸眼][今夜MVP/最佳看点：满月、s[土星、织女一（织女星）、河鼓二（牛郎星）、天津四]s]",
            "[可见星体（按可见度降序）：]",
            "ol[|【南天】满月|【南天·满月附近】土星、北落师门|【天顶】夏季大三角（河鼓二、天津四，织女一）（天鹰座、天鹅座、天琴座）|【东北天、东天】五车二（御夫座）、秋季四边形（星宿一、星宿二、壁宿一，壁宿二）（飞马座、仙女座）和飞马座诸星、天船三（英仙座）|【北天】勾陈一（北极星）（小熊座）、仙后座W形（王良四、王良一、策、阁道三、阁道二）、天钩五（仙王座）、北极二（小熊座）、北斗一（大熊座）、北斗五（大熊座）、北斗六（大熊座）|【西北天】天棓四（天龙座）、天棓三（天龙座）|【西天】侯（蛇夫座）]ol"
        ]
    },
    {
        type: "blog",
        id: "",
        date: "2024-08-09",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor }
        ],
        title: "GGGGS停更通知",
        topics: ["原神"],
        contents: [
            "[感谢大家半年来对GGGGS项目开发的陪伴与支持！]",
            "[半年来，我们共同见证了GGGGS的成长。]",
            "[不知不觉，2024年已经过半了。半年前的2月9日，除夕，下午，GGGGS仓库中诞生了第一个发布——v1.0.7，那是难忘的开始的时刻。此后GGGGS保持稳步更新，从优化算法到严密逻辑，从增加功能到美化界面，从角色到“混池”再到武器……GGGGS在180天之内全都做到了。]",
            "[站在GGGGS发布半年的时间节点上，回望GGGGS坎坷的开发历程，的确心酸劳苦，但是乐在其中。我们在开发过程中涨了不少经验，吸取了不少教训，也学到了不少新知。这难忘的经历对我们来说是独一无二的最宝贵的财富。]",
            "[其实，GGGGS从4月5日更新到v5.0以后——仅仅两个月——我们的使命就已经完成了——GGGGS的全部功能已经齐全。后4个月的更新，主要在于游戏数据跟进和小功能优化。到今天，GGGGS的开发目标已经全部达成，走到了计划的重点。]",
            "[GGGGS走到今天，满载着大家的关注与支持，是时候跟大家说一声再见了。GGGGS当前的版本是v5.4.0。从此，我们不再开发新的次级版本。也就是说，v5.4是GGGGS的最后一个版本，以后不会有v5.5、v6.0。以后GGGGS除了小型功能优化更新之外，只是跟进游戏数据。]",
            "[GGGGS的时代在今天圆满落下帷幕。再次感谢大家的陪伴与支持！]"
        ]
    },
    {
        type: "blog",
        id: "",
        date: "2024-02-17",
        authors: [
            { user: USERS.BLOG_OWNER, role: ROLES.FirstAuthor },
            { user: USERS.VLambda24, role: ROLES.CoAuthor }
        ],
        title: "关于Tighnari的读音",
        topics: ["阿拉伯语", "原神"],
        contents: [
            "[我不是op]",
            "[《原神》的界面语言中并没有阿拉伯语。但将界面调成英语后，提纳里的英文名显示为“Tighnari”。]",
            "[DIN3165转写应为c[Ṭiġnarī]c，ALA-LC转写应为c[Ṭighnarī]c。国外英语玩家大多读成：tie-narry，这当然是错误的。]",
            "[根据考据，提纳里实际为阿拉伯名。]",
            "[根据母语人士，tighnari由v[%{ara}ط]v（ṭ，音标为/tˤ/，即咽化/t/）、v[%{ara}غ]v（ġ，音标为/ɣ/，即浊软腭擦音）、v[%{ara}ن]v（n）、v[%{ara}ر]v（r，/r/，大舌颤音）、v[%{ara}ي]v（y）构成。]",
            "[完整名字为v[%{ara}الطغنري]v，即v[%{ara}الْطِغْنَرِيْ]v。]",
            "[读作：atig-na-ri（阿提厄纳里/阿提格纳里）]",
            "[其中al为定冠词，v[%{ara}ط]v（ṭ）属于太阳字母，定冠词al会被同化为aṭ。定冠词一般不算名字，因此提纳里的准确读法应为：提厄纳里/提格纳里。]",
            "[同样的思路，艾尔海森的名字应为“海森”。“艾尔”（al）为定冠词。完整名字是v[%{ara}الهيثم]v(c[Al-Hayṯam(DIN 3165)/Al-Haytham(ALA-LC)]c)，即v[%{ara}الْهَيْثَمْ]v。其准确读法应为“海瑟姆”“海什木”，或“阿勒 海瑟姆”。有人译为“阿尔哈桑”。]",
            "[依旧是同样的思路，莱依拉的名字是v[%{ara}الليلة]v，转写为c[Al-Laylah]c，意为“夜晚”“今晚”，是准确的译名。]",
            "h3[注释]h3",
            "[s[咽化]s：咽化是辅音或元音的次要调音，调音同时喉或会厌收紧。]",
            "[s[浊软腭擦音/ɣ/]s：是/x/对应的浊音。]",
            "[s[齿龈颤音/r/]s：多称“大舌颤音”，即rrrrrr。见于俄语中的字母“p”，如“乌rrrrr拉”。]",
            "[s[清软颚擦音/x/]s：即现代标准汉语拼音he的“h”。]"
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
            "[s[hello, world!]s] t[^|{c2r2}s[/\\\\\\|escape\\|/\\\\]s|&#xe215;|&#xe30d;&#xe30e;&#xe30f|{c2}CB||{c2}Varkā|\\{c4\\}|c10||{r2}increase|?|c[c++]c*3|s560|{r2}s[r2]s|i[Italic]i||\\^empty|&#xe342;|emphasis|c[F:i[Amīyā]i in]c|$]t",
            "bq[[“The only true wisdom is in knowing you know nothing.”]<footer>— Socrates</footer>]bq",
            "ol[|embed|c[kk]cg|t\\[ads\\]t|ul[|number|U780|f]ul|vb]ol",
            "[456q[I have a dream.]q456]",
            "c[Decoding Succeeded!]c"
        ]
    }
    /*
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
        title: "",
        topics: [],
        contents: []
    },
    */
];