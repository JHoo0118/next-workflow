import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewNodeFormSchema } from "@/lib/types";
import { useModal } from "@/providers/ModalProvider";
import {
  EditCanvasCardCardType,
  EditCanvasCardComponentType,
  useEditCanvasCardStore,
} from "@/store/editCanvasStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  title?: string;
  subTitle?: string;
};

const NewNodeForm = ({ subTitle, title }: Props) => {
  const { setClose } = useModal();
  const { addCard } = useEditCanvasCardStore();
  const form = useForm<z.infer<typeof NewNodeFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(NewNodeFormSchema),
    defaultValues: {
      key: "",
      componentType: "Server",
      name: "",
      description: "",
      cardType: "Many",
    },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof NewNodeFormSchema>) => {
    const key = form.getValues("key");
    const name = form.getValues("name");
    const description = form.getValues("description");
    const componentType = form.getValues(
      "componentType"
    ) as EditCanvasCardComponentType;
    const cardType = form.getValues("cardType") as EditCanvasCardCardType;

    addCard(key, {
      name,
      description,
      type: "Action",
      componentType,
      cardType,
    });

    form.reset();

    //@ts-ignore
    // setNodes((nds) => nds.concat(newNode));
    setClose();
  };

  return (
    <Card className="w-full max-w-[650px] border-none">
      {title && subTitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subTitle}</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="componentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>노드 유형</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Client">클라이언트</SelectItem>
                      <SelectItem value="Server">서버</SelectItem>
                      <SelectItem value="Etc">기타</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={isLoading}
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>노드 키</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="예: User Service" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>노드 이름</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="노드 이름을 입력해 주세요" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>노드 설명</FormLabel>
                  <FormControl>
                    <Input placeholder="노드 설명을 입력해 주세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="cardType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>연결 유형</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Start">시작</SelectItem>
                      <SelectItem value="End">끝</SelectItem>
                      <SelectItem value="Many">다중</SelectItem>
                      <SelectItem value="Text">텍스트</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-4" disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 저장 중...
                </>
              ) : (
                "노드 생성하기"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NewNodeForm;
