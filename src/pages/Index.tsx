import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface FamilyStory {
  id: number;
  surname: string;
  district: string;
  year: string;
  title: string;
  preview: string;
  fullText?: string;
  photos?: string[];
  images: number;
  status?: 'published' | 'moderation';
}

const RYAZAN_DISTRICTS = [
  'Рязанский', 'Касимовский', 'Скопинский', 'Сасовский', 'Михайловский',
  'Ряжский', 'Шиловский', 'Рыбновский', 'Старожиловский', 'Спасский'
];

const mockStories: FamilyStory[] = [
  {
    id: 1,
    surname: 'Ивановы',
    district: 'Рязанский',
    year: '1943',
    title: 'История семьи Ивановых из Рязани',
    preview: 'Наша семья прошла через тяжелые годы войны. Дедушка Иван воевал под Москвой...',
    fullText: 'Наша семья прошла через тяжелые годы Великой Отечественной войны. Дедушка Иван Петрович Иванов был призван на фронт в 1941 году и воевал под Москвой в составе 316-й стрелковой дивизии.\n\nБабушка Мария Ивановна осталась дома с тремя детьми. Она работала на заводе, который был эвакуирован в Рязань из Москвы. Несмотря на голод и холод, она смогла сохранить семью и дождаться мужа с фронта.\n\nДедушка вернулся с войны в 1945 году с медалями "За оборону Москвы" и "За победу над Германией". После войны он работал учителем истории в школе и всегда рассказывал детям о важности мира.\n\nНаша семья бережно хранит военные награды, письма с фронта и фотографии тех лет. Это наша гордость и память о поколении победителей.',
    photos: [
      'https://images.unsplash.com/photo-1577888520903-9e938fcb2d63?w=800',
      'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800',
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800'
    ],
    images: 8,
    status: 'published'
  },
  {
    id: 2,
    surname: 'Петровы',
    district: 'Касимовский',
    year: '1956',
    title: 'Династия учителей Петровых',
    preview: 'Три поколения нашей семьи посвятили себя образованию детей в Касимове...',
    images: 12,
    status: 'published'
  },
  {
    id: 3,
    surname: 'Смирновы',
    district: 'Скопинский',
    year: '1978',
    title: 'Семейный альбом Смирновых',
    preview: 'Наши корни уходят в глубь веков. Прадед был мастером гончарного дела...',
    images: 15,
    status: 'published'
  },
  {
    id: 4,
    surname: 'Козловы',
    district: 'Сасовский',
    year: '1965',
    title: 'Рабочая династия Козловых',
    preview: 'Вся семья работала на железной дороге. Это наша гордость и история...',
    images: 6,
    status: 'published'
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedStory, setSelectedStory] = useState<FamilyStory | null>(null);
  const [userStories] = useState<FamilyStory[]>([
    {
      id: 5,
      surname: 'Моя семья',
      district: 'Рязанский',
      year: '1980',
      title: 'История нашей семьи',
      preview: 'Наша семья живет в Рязани уже пять поколений...',
      images: 10,
      status: 'moderation'
    }
  ]);

  const filteredStories = mockStories.filter(story => {
    const matchesSearch = story.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || story.district === selectedDistrict;
    const matchesYear = selectedYear === 'all' || story.year.startsWith(selectedYear);
    return matchesSearch && matchesDistrict && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="BookHeart" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Альбом памяти
                </h1>
                <p className="text-sm text-muted-foreground">Семья — сердце Родины</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-2">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button
                variant={activeTab === 'about' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('about')}
                className="gap-2"
              >
                <Icon name="Info" size={18} />
                О платформе
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="gap-2">
                    <Icon name="Upload" size={18} />
                    Загрузить историю
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Поделитесь историей вашей семьи</DialogTitle>
                    <DialogDescription>
                      Отправьте документы и фотографии на модерацию. После проверки ваша история появится на платформе.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="surname">Фамилия семьи *</Label>
                      <Input id="surname" placeholder="Иванов" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="district">Район Рязанской области *</Label>
                        <Select>
                          <SelectTrigger id="district">
                            <SelectValue placeholder="Выберите район" />
                          </SelectTrigger>
                          <SelectContent>
                            {RYAZAN_DISTRICTS.map(district => (
                              <SelectItem key={district} value={district}>{district}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Год начала истории *</Label>
                        <Input id="year" type="number" placeholder="1945" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Название истории *</Label>
                      <Input id="title" placeholder="История семьи Ивановых" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="story">Расскажите историю вашей семьи *</Label>
                      <Textarea 
                        id="story" 
                        placeholder="Наша семья живет в Рязани уже много поколений..."
                        rows={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photos">Фотографии и документы</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Icon name="ImagePlus" size={48} className="mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Нажмите для загрузки или перетащите файлы
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Поддерживаются JPG, PNG, PDF до 10 МБ
                        </p>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить на модерацию
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('profile')}
                className="gap-2"
              >
                <Icon name="User" size={18} />
                Кабинет
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section className="text-center py-12 space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
                Сохраним память о наших семьях
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Цифровой архив историй семей Рязанской области. Поделитесь своей историей с миром.
              </p>
            </section>

            <Card className="shadow-lg border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Search" size={24} />
                  Поиск семейных историй
                </CardTitle>
                <CardDescription>
                  Найдите истории по фамилии, району или периоду времени
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск по фамилии или названию..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="w-full md:w-[200px] h-12">
                      <SelectValue placeholder="Все районы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все районы</SelectItem>
                      {RYAZAN_DISTRICTS.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full md:w-[200px] h-12">
                      <SelectValue placeholder="Все годы" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все годы</SelectItem>
                      <SelectItem value="194">1940-е</SelectItem>
                      <SelectItem value="195">1950-е</SelectItem>
                      <SelectItem value="196">1960-е</SelectItem>
                      <SelectItem value="197">1970-е</SelectItem>
                      <SelectItem value="198">1980-е</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold">Семейные истории</h3>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Найдено: {filteredStories.length}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story, index) => (
                  <Card 
                    key={story.id} 
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-scale-in border-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl">{story.surname}</CardTitle>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="gap-1">
                              <Icon name="MapPin" size={14} />
                              {story.district}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Icon name="Calendar" size={14} />
                              {story.year}
                            </Badge>
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                          <Icon name="Image" size={20} className="text-primary" />
                          <span className="text-xs font-bold text-primary absolute mt-6">{story.images}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <h4 className="font-semibold text-lg">{story.title}</h4>
                      <p className="text-muted-foreground line-clamp-3">{story.preview}</p>
                      <Button 
                        variant="ghost" 
                        className="w-full gap-2 group"
                        onClick={() => setSelectedStory(story)}
                      >
                        Читать историю
                        <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="Heart" size={32} className="text-secondary" />
                  О платформе «Альбом памяти»
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <p className="leading-relaxed">
                  Онлайн-платформа <strong>Альбом памяти «Семья — сердце Родины»</strong> представляет 
                  собой цифровой архив, содержащий истории семей Рязанской области и их фотографии.
                </p>
                <div className="bg-primary/5 p-6 rounded-xl space-y-3">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Icon name="Target" size={24} className="text-primary" />
                    Наша миссия
                  </h3>
                  <p className="leading-relaxed">
                    Сохранить память о семьях Рязанской области для будущих поколений и создать 
                    единое пространство, где каждый может поделиться историей своей семьи с миром.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Icon name="Shield" size={20} className="text-accent" />
                      Модерация контента
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      Все документы и истории проходят проверку на соответствие тематике платформы 
                      перед публикацией.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Icon name="Users" size={20} className="text-accent" />
                      Открытый доступ
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      Все опубликованные истории доступны посетителям сайта для изучения и 
                      знакомства с историей края.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="User" size={32} />
                  Личный кабинет
                </CardTitle>
                <CardDescription className="text-base">
                  Управляйте вашими публикациями и следите за статусом модерации
                </CardDescription>
              </CardHeader>
            </Card>

            <Tabs defaultValue="my-stories" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="my-stories" className="gap-2">
                  <Icon name="BookMarked" size={18} />
                  Мои истории
                </TabsTrigger>
                <TabsTrigger value="drafts" className="gap-2">
                  <Icon name="FileEdit" size={18} />
                  Черновики
                </TabsTrigger>
              </TabsList>
              <TabsContent value="my-stories" className="space-y-4 mt-6">
                {userStories.map(story => (
                  <Card key={story.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">{story.title}</CardTitle>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="gap-1">
                              <Icon name="MapPin" size={14} />
                              {story.district}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Icon name="Calendar" size={14} />
                              {story.year}
                            </Badge>
                            <Badge variant="outline" className="gap-1">
                              <Icon name="Image" size={14} />
                              {story.images} фото
                            </Badge>
                          </div>
                        </div>
                        <Badge 
                          variant={story.status === 'published' ? 'default' : 'secondary'}
                          className="gap-2"
                        >
                          <Icon 
                            name={story.status === 'published' ? 'CheckCircle2' : 'Clock'} 
                            size={14} 
                          />
                          {story.status === 'published' ? 'Опубликовано' : 'На модерации'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{story.preview}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                          <Icon name="Edit" size={18} />
                          Редактировать
                        </Button>
                        <Button variant="outline" className="gap-2">
                          <Icon name="Eye" size={18} />
                          Просмотр
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="drafts" className="mt-6">
                <Card className="border-2 border-dashed">
                  <CardContent className="py-12 text-center">
                    <Icon name="FileQuestion" size={64} className="mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground text-lg">Черновиков пока нет</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-primary/5 to-accent/5 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="BookHeart" className="text-white" size={20} />
              </div>
              <div>
                <p className="font-bold">Альбом памяти</p>
                <p className="text-sm text-muted-foreground">Семья — сердце Родины</p>
              </div>
            </div>
            <p className="text-muted-foreground text-center">
              © 2024 Рязанская область. Сохраняем историю вместе.
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedStory && (
            <div className="space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <DialogTitle className="text-3xl md:text-4xl">{selectedStory.title}</DialogTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="gap-1 text-base px-3 py-1">
                        <Icon name="Users" size={16} />
                        {selectedStory.surname}
                      </Badge>
                      <Badge variant="secondary" className="gap-1 text-base px-3 py-1">
                        <Icon name="MapPin" size={16} />
                        {selectedStory.district}
                      </Badge>
                      <Badge variant="secondary" className="gap-1 text-base px-3 py-1">
                        <Icon name="Calendar" size={16} />
                        {selectedStory.year}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedStory(null)}
                    className="shrink-0"
                  >
                    <Icon name="X" size={24} />
                  </Button>
                </div>
              </DialogHeader>

              {selectedStory.photos && selectedStory.photos.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Icon name="Images" size={24} />
                    Фотографии семьи
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedStory.photos.map((photo, index) => (
                      <div 
                        key={index}
                        className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer border-2 hover:border-primary transition-all"
                      >
                        <img 
                          src={photo} 
                          alt={`${selectedStory.surname} фото ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <p className="text-white text-sm font-medium">Фото {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Icon name="BookOpen" size={24} />
                  История семьи
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-base leading-relaxed whitespace-pre-line text-foreground">
                    {selectedStory.fullText || selectedStory.preview}
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 space-y-3">
                <h4 className="font-bold flex items-center gap-2">
                  <Icon name="Info" size={20} />
                  Информация о публикации
                </h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Image" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Фотографий:</span>
                    <span className="font-semibold">{selectedStory.images}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Район:</span>
                    <span className="font-semibold">{selectedStory.district}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Год:</span>
                    <span className="font-semibold">{selectedStory.year}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}