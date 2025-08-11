import React, { useState, useEffect, useRef } from 'react';
import { Camera, Image, ChevronDown, ArrowRight, Menu,  Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import logo from '@/assets/logo.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


// Lista de lojas
const stores = [
  { id: '1', name: 'MATEUS SUPERMERCADOS S.A. - BALSAS' },
  { id: '2', name: 'MATEUS SUPERMERCADOS S.A. - CEARA' },
  { id: '3', name: 'MATEUS SUPERMERCADOS S.A. - SANTA INES' },
  { id: '4', name: 'MATEUS SUPERMERCADOS S.A. - GOIAS' },
  { id: '5', name: 'MATEUS SUPERMERCADOS S.A. - COHAB' },
  { id: '7', name: 'MATEUS SUPERMERCADOS S.A. - COHAMA' },
  { id: '8', name: 'MATEUS SUPERMERCADOS S.A. - TURU-SM08' },
  { id: '11', name: 'MATEUS SUPERMERCADOS S.A. - CID. OPERARIA' },
  { id: '12', name: 'MATEUS SUPERMERCADOS S.A. - RIO ANIL' },
  { id: '15', name: 'MATEUS SUPERMERCADOS S.A. - ACAILANDIA' },
  { id: '16', name: 'MATEUS SUPERMERCADOS S.A. - CALHAU' },
  { id: '17', name: 'MATEUS SUPERMERCADOS S.A. - MIX TIRIRICAL' },
  { id: '18', name: 'MATEUS SUPERMERCADOS S.A. - COHATRAC' },
  { id: '19', name: 'MATEUS SUPERMERCADOS S.A. - S. DA ILHA' },
  { id: '20', name: 'MATEUS SUPERMERCADOS S.A. - MIX VINHAIS' },
  { id: '23', name: 'MATEUS SUPERMERCADOS S.A. - CAJAZEIRAS' },
  { id: '24', name: 'MATEUS SUPERMERCADOS S A SUPER MARABA' },
  { id: '25', name: 'MATEUS SUPERMERCADOS S A - MIX NOVA MARABA' },
  { id: '26', name: 'MATEUS SUPERMERCADOS S.A. - MIX MARABA' },
  { id: '27', name: 'MATEUS SUPERMERCADOS S.A. - TURU-SM27' },
  { id: '28', name: 'MATEUS SUPERMERCADOS S.A. MIX PARAUAPEBAS' },
  { id: '29', name: 'MATEUS SUPERMERCADOS S.A. - MIX JARDIM TROPICAL' },
  { id: '30', name: 'MATEUS SUPERMERCADOS S.A. - BACANGA' },
  { id: '31', name: 'MATEUS SUPERMERCADOS S.A. - PATIO NORTE' },
  { id: '32', name: 'MATEUS SUPERMERCADOS S.A. - MIX TIMON' },
  { id: '34', name: 'MATEUS SUPERMERCADOS S.A. - JARDIM RENASCENCA' },
  { id: '35', name: 'MATEUS SUPERMERCADOS S A SUPER CASTANHAL' },
  { id: '36', name: 'MATEUS SUPERMERCADOS S.A. JADERLANDIA' },
  { id: '37', name: 'MATEUS SUPERMERCADOS S A MIX BELEM' },
  { id: '38', name: 'MATEUS SUPERMERCADOS S A MIX ALTAMIRA' },
  { id: '39', name: 'MATEUS SUPERMERCADOS S.A. - MIX CHAPADINHA' },
  { id: '40', name: 'MATEUS SUPERMERCADOS S.A. - BARRA DO CORDA' },
  { id: '41', name: 'MATEUS SUPERMERCADOS SA - MIX CAXIAS' },
  { id: '42', name: 'MATEUS SUPERMERCADOS SA - PRES DUTRA' },
  { id: '44', name: 'MATEUS SUPERMERCADOS S.A. - MIX BABACULANDIA' },
  { id: '45', name: 'MATEUS SUPERMERCADOS SA MARAMBAIA' },
  { id: '46', name: 'MATEUS SUPERMERCADOS MAGUARI' },
  { id: '47', name: 'MATEUS SUPERMERCADOS SA - MIX BACABAL' },
  { id: '48', name: 'MATEUS SUPERMERCADOS SA - MIX PEDREIRAS' },
  { id: '49', name: 'MATEUS SUPERMERCADOS SA MIX CASTANHAL' },
  { id: '50', name: 'MATEUS SUPERMERCADOS S A MIX ABAETETUBA' },
  { id: '51', name: 'MATEUS SUPERMERCADOS SA MIX MARITUBA' },
  { id: '52', name: 'MATEUS SUPERMERCADOS S. A. MIX ACAILANDIA' },
  { id: '91', name: 'MATEUS SUPERMERCADOS S.A. - MIX STA INES' },
  { id: '92', name: 'MATEUS SUPERMERCADOS S.A. - MIX BACURI' },
  { id: '93', name: 'MATEUS SUPERMERCADOS S.A. - MIX MAIOBAO' },
  { id: '94', name: 'MATEUS SUPERMERCADOS S.A. - MIX BALSAS' },
  { id: '95', name: 'MATEUS SUPERMERCADOS S.A. - MIX ITZ' },
  { id: '96', name: 'MATEUS SUPERMERCADOS S.A. - MIX JOAO PAULO' },
  { id: '97', name: 'MATEUS SUPERMERCADOS SA - MIX TERESINA' },
  { id: '99', name: 'MATEUS SUPERMERACADOS SA - MIX PINHEIRO' },
  { id: '141', name: 'ASSAÍ ATACADISTA - TURU' },
  { id: '172', name: 'ASSAÍ ATACADISTA - IMPERATRIZ' },
  { id: '193', name: 'ASSAÍ ATACADISTA - GUAJAJARAS' },
  { id: '200', name: 'MATEUS SUPERMERCADOS S.A. SUPER ANIL' },
  { id: '201', name: 'MATEUS SUPERMERCADOS S.A. - SUPER COHATRAC' },
  { id: '202', name: 'MATEUS SUPERMERCADO S A SUPER CODO' },
  { id: '204', name: 'MATEUS SUPERMERCADOS S A SUPER BARCARENA' },
  { id: '208', name: 'MATEUS SUPERMERCADOS S A SUPER CANAA DOS CARAJAS' },
  { id: '215', name: 'MATEUS SUPERMERCADOS S.A SUPER COELHO NETO' },
  { id: '217', name: 'MATEUS SUPERMERCADOS S.A. SUPER RAPOSA' },
  { id: '218', name: 'MATEUS SUPERMERCADOS S.A. SUPER SAO RAIMUNDO' },
  { id: '251', name: 'MATEUS SUPERMERCADOS S.A - MIX PARNAIBA' },
  { id: '252', name: 'MATEUS SUPERMERCADOS S.A - MIX TERESINA-NOVAFAPI' },
  { id: '253', name: 'MATEUS SUPERMERCADOS S A MIX PEDREIRA BELEM' },
  { id: '254', name: 'MATEUS SUPERMERCADOS S A MIX PARQUE DOS CARAJAS' },
  { id: '255', name: 'MATEUS SUPERMERCADOS S A MIX ARACAGY' },
  { id: '256', name: 'MATEUS SUPERMERCADOS S.A. MIX CAPANEMA' },
  { id: '257', name: 'MATEUS SUPERMERCADOS S A MIX COQUEIRO' },
  { id: '259', name: 'MATEUS SUPERMERCADOS S A MIX GUAJAJARAS FORQUILHA' },
  { id: '260', name: 'MATEUS SUPERMERCADOS S A MIX TUCURUI' },
  { id: '263', name: 'MATEUS SUPERMERCADOS S A MIX MARIO COVAS' },
  { id: '267', name: 'MATEUS SUPERMERCADOS S A MIX BRAGANCA' },
  { id: '268', name: 'MATEUS SUPERMERCADOS S A MIX PARAGOMINAS' },
  { id: '269', name: 'MATEUS SUPERMERCADOS S A MIX UBATUBA' },
  { id: '271', name: 'MATEUS SUPERMERCADOS S A MIX FLORIANO PI' },
  { id: '275', name: 'MATEUS SUPERMERCADOS S A MIX TIMON ALVORADA' },
  { id: '276', name: 'MATEUS SUPERMERCADOS S A MIX BENGUI' },
  { id: '296', name: 'MATEUS SUPERMERCADOS S A MIX BALSAS POTOSI' },
  { id: '311', name: 'ASSAÍ ATACADISTA - ANGELIM' },
  { id: '408', name: 'MERCADINHO CARONE LTDA - ANJO DA GUARDA LJ 005' },
  { id: '410', name: 'MERCADINHO CARONE LTDA - SAO CRISTOVAO LJ 004' },
  { id: '411', name: 'MERCADINHO CARONE LTDA - MARANHAO NOVO LJ 002' },
  { id: '412', name: 'MERCADINHO CARONE LTDA - ITAPIRACO LJ 001' },
  { id: '414', name: 'POSTERUS SUPERMERCADOS LTDA - ESTREITO' },
  { id: '415', name: 'POSTERUS SUPERMERCADOS LTDA - SAO BERNARDO' },
  { id: '418', name: 'POSTERUS SUPERMERCADOS LTDA - DIVINEIA' },
  { id: '424', name: 'POSTERUS SUPERMERCADOS LTDA - ROSARIO' },
  { id: '425', name: 'POSTERUS SUPERMERCADOS LTDA - S J RIBAMAR' },
  { id: '426', name: 'POSTERUS SUPERMERCADOS LTDA SAO FELIX LL' },
  { id: '429', name: 'POSTERUS SUPERMERCADOS LTDA - SANTA RITA' },
  { id: '433', name: 'POSTERUS SUPERMERCADOS VIANA' },
  { id: '434', name: 'POSTERUS SUPERMERCADOS LTDA - BARREIRINHAS' },
  { id: '445', name: 'POSTERUS SUPERMERCADOS LTDA ITAPECURU' },
  { id: '450', name: 'POSTERUS SUPERMERCADOS LTDA ZE DOCA' },
  { id: '451', name: 'POSTERUS SUPERMERCADOS LTDA VARGEM GRANDE' },
  { id: '457', name: 'POSTERUS SUPERMERCADOS LTDA SAO BENTO' },
  { id: '502', name: 'MATEUS SUPERMERCADOS S.A. - SUPER SANTA CLARA' },
  { id: '526', name: 'MATEUS SUPERMERCADOS S.A. SUPER ALEMANHA' },
  { id: '537', name: 'MATEUS SUPERMERCADOS S.A. MIX BARREIRINHAS' },
  { id: '222', name: 'MIX MATEUS SUPERMERCADO - ROSARIO'},
];

const SearchProducts = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [storeSearchTerm, setStoreSearchTerm] = useState('');
  const [storeOpen, setStoreOpen] = useState(false);
  const [formData, setFormData] = useState({
    store: '',
    supplier: '',
    uf: 'MA', // Default to MA as shown in the image
  });
  const [ufOpen, setUfOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUfSelect = (uf: string) => {
    setFormData(prev => ({ ...prev, uf }));
    setUfOpen(false);
  };

  const handleOpenCamera = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleSelectFromGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        toast({
          title: "Imagem capturada",
          description: "A foto foi selecionada com sucesso.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled and image is selected
    if (!formData.store || !formData.supplier || !selectedImage) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos e selecione uma imagem.",
      });
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async (isLegible: boolean) => {
    setShowConfirmDialog(false);

    if (!isLegible) {
      toast({
        variant: "destructive",
        title: "Imagem ilegível",
        description: "Por favor, tire uma nova foto ou selecione outra imagem.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert base64 to blob
      const base64Response = await fetch(selectedImage!);
      const blob = await base64Response.blob();

      // Create FormData
      const formDataToSend = new FormData();
      const selectedStore = stores.find(s => s.id === formData.store);
      formDataToSend.append('store', selectedStore ? selectedStore.name : '');
      formDataToSend.append('supplier', formData.supplier);
      formDataToSend.append('uf', formData.uf);
      formDataToSend.append('image', blob, 'photo.jpg');

      // Send to webhook
      const response = await fetch('https://n8n-sgo8ksokg404ocg8sgc4sooc.vemprajogo.com/webhook/formulario-fotos-fe', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Erro ao enviar dados');

      toast({
        title: "Sucesso!",
        description: "Os dados foram enviados com sucesso.",
      });

      // Reset form
      setFormData({
        store: '',
        supplier: '',
        uf: 'MA',
      });
      setSelectedImage(null);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar os dados. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSupportClick = () => {
    window.open('https://wa.me/5598984651553?text=O site está com problemas e preciso de ajuda.', '_blank');
  };

  const getStoreNameById = (id: string) => {
    const store = stores.find(s => s.id === id);
    return store ? `${store.id} - ${store.name}` : '';
  };

  const handleStoreSelect = (storeId: string) => {
    setFormData(prev => ({ ...prev, store: storeId }));
    setStoreOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageCapture}
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleImageCapture}
      />

      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center md:justify-center justify-between relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:mr-4"
            >
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            </motion.div>
            
            <div className="hidden md:flex items-center justify-center">
              <nav className="flex space-x-8">
                <motion.a
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  href="/"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-300"
                >
                  Validade
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  href="https://ferepresentacoes.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-300"
                >
                  Fé Representação
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href="https://grupofeoficial.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-300"
                >
                  Grupo Fé
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  href="https://iafeoficial.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-300"
                >
                  Iafé Tech
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  href="#"
                  onClick={handleSupportClick}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-300"
                >
                  Suporte
                </motion.a>
              </nav>
            </div>
            
            <div className="md:hidden absolute right-0">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Menu Mobile */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-100"
            >
              <div className="flex flex-col py-2">
                <a
                  href="/"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-orange transition-colors duration-300"
                >
                  Validade
                </a>
                <a
                  href="https://ferepresentacoes.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-orange transition-colors duration-300"
                >
                  Fé Representação
                </a>
                <a
                  href="https://grupofeoficial.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-orange transition-colors duration-300"
                >
                  Grupo Fé
                </a>
                <a
                  href="https://iafeoficial.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-orange transition-colors duration-300"
                >
                  Iafé Tech
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSupportClick();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-orange transition-colors duration-300"
                >
                  Suporte
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden"
        >
          {/* Form Header */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-brand-orange to-brand-orange-light px-6 py-4">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-white">Pesquisa de produtos</h1>
              <div className="mt-2 flex items-center text-white/90">
                <Clock className="mr-1 h-4 w-4" />
                <span>{currentTime}</span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="store" className="text-gray-700">
                  Nome da Loja:
                </Label>
                <Popover open={storeOpen} onOpenChange={setStoreOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={storeOpen}
                      className="h-11 w-full justify-between text-left font-normal focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300"
                    >
                      {formData.store ? (
                        getStoreNameById(formData.store)
                      ) : (
                        "Selecionar a Loja"
                      )}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[30rem] p-0" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Pesquisar loja..."
                        value={storeSearchTerm}
                        onValueChange={setStoreSearchTerm}
                      />
                      <CommandEmpty>Nenhuma loja encontrada.</CommandEmpty>
                      <CommandList className="max-h-[350px]">
                        <CommandGroup>
                          {stores
                            .filter(store => 
                              store.name.toLowerCase().includes(storeSearchTerm.toLowerCase()) ||
                              store.id.includes(storeSearchTerm)
                            )
                            .map(store => (
                              <CommandItem
                                key={store.id}
                                value={`${store.id} ${store.name}`}
                                onSelect={() => handleStoreSelect(store.id)}
                              >
                                <span className="text-sm">{store.id} - {store.name}</span>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier" className="text-gray-700">
                  Nome do Fornecedor:
                </Label>
                <Input
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  className="h-11 focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300"
                  placeholder="Digite o nome do fornecedor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uf" className="text-gray-700">
                  UF:
                </Label>
                <Popover open={ufOpen} onOpenChange={setUfOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={ufOpen}
                      className="h-11 w-full justify-between text-left font-normal focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300"
                    >
                      {formData.uf || "Selecionar a UF"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem onSelect={() => {
                            setFormData(prev => ({ ...prev, uf: 'MA' }));
                            setUfOpen(false);
                          }}>
                            <span>MA</span>
                          </CommandItem>
                          <CommandItem onSelect={() => {
                            setFormData(prev => ({ ...prev, uf: 'PI' }));
                            setUfOpen(false);
                          }}>
                            <span>PI</span>
                          </CommandItem>
                          <CommandItem onSelect={() => {
                            setFormData(prev => ({ ...prev, uf: 'PA' }));
                            setUfOpen(false);
                          }}>
                            <span>PA</span>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {selectedImage && (
                <div className="mt-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <img
                      src={selectedImage}
                      alt="Imagem selecionada"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              <div className={cn(
                "grid gap-3 mt-6",
                isMobile ? "grid-cols-1" : "grid-cols-2"
              )}>
                <Button 
                  type="button"
                  onClick={handleOpenCamera}
                  className="h-12 bg-brand-orange hover:bg-brand-orange-light text-white font-medium transition-all duration-300"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Abrir Câmera
                </Button>
                <Button 
                  type="button"
                  onClick={handleSelectFromGallery}
                  className="h-12 bg-brand-orange hover:bg-brand-orange-light text-white font-medium transition-all duration-300"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Selecionar da Galeria
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-brand-orange hover:bg-brand-orange-light text-white font-medium transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar envio</DialogTitle>
            <DialogDescription>
              A imagem está legível e clara o suficiente?
            </DialogDescription>
          </DialogHeader>
          
          {selectedImage && (
            <div className="mt-4">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full rounded-lg"
              />
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleConfirmSubmit(false)}
              disabled={isSubmitting}
            >
              Não, tirar nova foto
            </Button>
            <Button
              onClick={() => handleConfirmSubmit(true)}
              disabled={isSubmitting}
              className="bg-brand-orange hover:bg-brand-orange-light"
            >
              Sim, enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchProducts; 
