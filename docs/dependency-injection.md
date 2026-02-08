```typescript

@Module({
    controllers: [MyController],
    providers: [MyService]
})
export class MyModule {}

@Controller()
export class MyController {
    constructor(private myService: MyService) {}
}

@Injectable()
export class MyService {}


