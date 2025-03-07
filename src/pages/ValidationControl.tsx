import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronDown, Clock, ArrowRight, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { fetchCodeByCode, type Code } from '@/services/supabaseService';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import logo from '@/assets/logo.png';
import { NumericFormat } from 'react-number-format';

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
];

const ValidationControl = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentTime, setCurrentTime] = useState(format(new Date(), 'HH:mm:ss'));
  const [formData, setFormData] = useState({
    promoterName: '',
    store: '',
    state: '',
    code: '',
    description: '',
    batch: '',
    quantity: '',
    price: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [storeSearchTerm, setStoreSearchTerm] = useState('');
  const [codeDetails, setCodeDetails] = useState<Code | null>(null);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), 'HH:mm:ss'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch code details when code is entered
  useEffect(() => {
    const fetchCodeDetails = async () => {
      if (formData.code && formData.code.length > 2) {
        setIsLoadingCode(true);
        try {
          const details = await fetchCodeByCode(formData.code);
          setCodeDetails(details);
          
          // Autofill description if code is found
          if (details) {
            setFormData(prev => ({ 
              ...prev, 
              description: details.produto 
            }));
            
            toast({
              title: "Código encontrado",
              description: `${details.produto} - ${details.industria}`,
            });
          }
        } catch (error) {
          console.error('Error fetching code details:', error);
        } finally {
          setIsLoadingCode(false);
        }
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchCodeDetails();
    }, 500); // Debounce time of 500ms

    return () => clearTimeout(debounceTimer);
  }, [formData.code, toast]);

  // Effect for auto-closing the thank you dialog
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (showThankYouDialog) {
      timeoutId = setTimeout(() => {
        setShowThankYouDialog(false);
      }, 10000); // 10 seconds
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showThankYouDialog]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStoreSelect = (storeId: string) => {
    setFormData(prev => ({ ...prev, store: storeId }));
    setStoreOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verifica se o código reduzido foi encontrado no banco de dados
    if (formData.code && !codeDetails) {
      toast({
        variant: "destructive",
        title: "Código reduzido inválido",
        description: "O código informado não foi encontrado no banco de dados ou está incorreto. Por favor, verifique e tente novamente.",
      });
      return;
    }
    
    const isFormValid = Object.values(formData).every(value => value !== '') && date !== undefined;
    
    if (isFormValid) {
      setIsSubmitting(true);
      
      try {
        const selectedStore = stores.find(store => store.id === formData.store);
        
        const dataToSend = {
          ...formData,
          storeName: selectedStore?.name || '',
          industria: codeDetails?.industria || '',
          date: date ? format(date, 'yyyy-MM-dd') : '',
          submittedAt: new Date().toISOString()
        };
        
        const response = await fetch('https://n8n-sgo8ksokg404ocg8sgc4sooc.vemprajogo.com/webhook-test/comercial1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
        
        if (response.ok) {
          setShowThankYouDialog(true); // Show thank you dialog instead of toast
          
          setFormData({
            promoterName: '',
            store: '',
            state: '',
            code: '',
            description: '',
            batch: '',
            quantity: '',
            price: ''
          });
          setDate(new Date());
          setCodeDetails(null);
        } else {
          throw new Error('Falha ao enviar os dados');
        }
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        toast({
          variant: "destructive",
          title: "Erro ao enviar dados",
          description: "Ocorreu um problema ao enviar os dados. Tente novamente.",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos do formulário.",
      });
    }
  };

  const handleSupportClick = () => {
    window.open('https://wa.me/5598984651553?text=O site está com problemas e preciso de ajuda.', '_blank');
  };

  // Get store name by id
  const getStoreNameById = (id: string) => {
    const store = stores.find(store => store.id === id);
    return store ? `${store.id} - ${store.name}` : '';
  };

  // Novo handler para o campo de preço
  const handlePriceChange = (values: { value: string }) => {
    const { value } = values;
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Se não houver valor, retorna vazio
    if (!numericValue) {
      setFormData(prev => ({ ...prev, price: '' }));
      return;
    }

    // Adiciona zeros à esquerda se necessário para ter pelo menos 3 dígitos
    const paddedValue = numericValue.padStart(3, '0');
    
    // Pega os dois últimos dígitos como centavos
    const cents = paddedValue.slice(-2);
    // Pega o resto como reais
    const reais = paddedValue.slice(0, -2);
    
    // Formata o número com separadores
    const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Combina reais e centavos
    const formattedValue = `${formattedReais},${cents}`;
    
    setFormData(prev => ({ ...prev, price: formattedValue }));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
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
                    href="/search-products"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-orange transition-colors duration-300"
                  >
                    Fazer Pesquisa
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
                    href="/search-products"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-orange transition-colors duration-300"
                  >
                    Fazer Pesquisa
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
                <h1 className="text-3xl font-bold text-white">Controle de validade</h1>
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
                  <Label htmlFor="promoterName">Nome Promotor</Label>
                  <Input
                    id="promoterName"
                    name="promoterName"
                    value={formData.promoterName}
                    onChange={handleInputChange}
                    className="h-11 focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300"
                    placeholder="Digite o nome do promotor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store">Loja</Label>
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
                  <Label htmlFor="state">Estado</Label>
                  <Popover open={stateOpen} onOpenChange={setStateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={stateOpen}
                        className="h-11 w-full justify-between text-left font-normal focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300"
                      >
                        {formData.state || "Selecionar o Estado"}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            <CommandItem onSelect={() => {
                              setFormData(prev => ({ ...prev, state: 'MA' }));
                              setStateOpen(false);
                            }}>
                              <span>MA</span>
                            </CommandItem>
                            <CommandItem onSelect={() => {
                              setFormData(prev => ({ ...prev, state: 'PI' }));
                              setStateOpen(false);
                            }}>
                              <span>PI</span>
                            </CommandItem>
                            <CommandItem onSelect={() => {
                              setFormData(prev => ({ ...prev, state: 'PA' }));
                              setStateOpen(false);
                            }}>
                              <span>PA</span>
                            </CommandItem>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Código reduzido</Label>
                  <Input
                    id="code"
                    name="code" 
                    value={formData.code}
                    onChange={handleInputChange}
                    className={cn(
                      "h-11 focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300",
                      isLoadingCode && "pr-10"
                    )}
                    placeholder="Digite o código"
                  />
                  {isLoadingCode && (
                    <div className="mt-1 text-xs text-gray-500">
                      Buscando código...
                    </div>
                  )}
                  {codeDetails && (
                    <div className="mt-1 text-xs text-green-600">
                      Indústria: {codeDetails.industria}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Data de Vencimento</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-11 w-full justify-start text-left font-normal focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "dd/MM/yyyy")
                        ) : (
                          <span>dd/mm/aaaa</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start" side="bottom" sideOffset={4}>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={ptBR}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Nome Produto</Label>
                  <Input
                    id="description"
                    name="description"
                    value={formData.description}
                    readOnly
                    disabled
                    className="h-11 focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300 bg-gray-50 cursor-not-allowed"
                    placeholder="Nome do produto será preenchido automaticamente"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batch">Lote</Label>
                  <Input
                    id="batch"
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    className="h-11 focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300"
                    placeholder="Digite o lote"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="h-11 focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300"
                    placeholder="Digite a quantidade"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700">
                    Preço:
                  </Label>
                  <NumericFormat
                    id="price"
                    name="price"
                    value={formData.price}
                    onValueChange={handlePriceChange}
                    prefix="R$ "
                    decimalSeparator=","
                    thousandSeparator="."
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    placeholder="R$ 0,00"
                    inputMode="numeric"
                    type="text"
                    customInput={Input}
                    className="h-11 focus:ring-2 focus:ring-brand-orange/30 transition-all duration-300"
                    allowLeadingZeros
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-brand-orange hover:bg-brand-orange-light text-white font-medium transition-all duration-300"
                >
                  {isSubmitting ? 'Enviando...' : 'Validar'}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>
          </motion.div>
        </main>
      </div>

      <Dialog open={showThankYouDialog} onOpenChange={setShowThankYouDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-brand-orange mb-2">
                Obrigado!
              </h2>
              <p className="text-gray-600 text-sm">
                Sua informação foi enviada com sucesso e já está disponível no grupo. Não é necessário enviar mensagem adicional.
              </p>
            </div>
            <Button
              variant="ghost"
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-500"
              onClick={() => setShowThankYouDialog(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ValidationControl;
