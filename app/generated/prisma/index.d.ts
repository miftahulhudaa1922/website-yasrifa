
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Pendaftaran
 * 
 */
export type Pendaftaran = $Result.DefaultSelection<Prisma.$PendaftaranPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Pendaftarans
 * const pendaftarans = await prisma.pendaftaran.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Pendaftarans
   * const pendaftarans = await prisma.pendaftaran.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.pendaftaran`: Exposes CRUD operations for the **Pendaftaran** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pendaftarans
    * const pendaftarans = await prisma.pendaftaran.findMany()
    * ```
    */
  get pendaftaran(): Prisma.PendaftaranDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Pendaftaran: 'Pendaftaran'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "pendaftaran"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Pendaftaran: {
        payload: Prisma.$PendaftaranPayload<ExtArgs>
        fields: Prisma.PendaftaranFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendaftaranFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendaftaranFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          findFirst: {
            args: Prisma.PendaftaranFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendaftaranFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          findMany: {
            args: Prisma.PendaftaranFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>[]
          }
          create: {
            args: Prisma.PendaftaranCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          createMany: {
            args: Prisma.PendaftaranCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendaftaranCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>[]
          }
          delete: {
            args: Prisma.PendaftaranDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          update: {
            args: Prisma.PendaftaranUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          deleteMany: {
            args: Prisma.PendaftaranDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendaftaranUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PendaftaranUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>[]
          }
          upsert: {
            args: Prisma.PendaftaranUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendaftaranPayload>
          }
          aggregate: {
            args: Prisma.PendaftaranAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendaftaran>
          }
          groupBy: {
            args: Prisma.PendaftaranGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendaftaranGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendaftaranCountArgs<ExtArgs>
            result: $Utils.Optional<PendaftaranCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    pendaftaran?: PendaftaranOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Pendaftaran
   */

  export type AggregatePendaftaran = {
    _count: PendaftaranCountAggregateOutputType | null
    _avg: PendaftaranAvgAggregateOutputType | null
    _sum: PendaftaranSumAggregateOutputType | null
    _min: PendaftaranMinAggregateOutputType | null
    _max: PendaftaranMaxAggregateOutputType | null
  }

  export type PendaftaranAvgAggregateOutputType = {
    id: number | null
  }

  export type PendaftaranSumAggregateOutputType = {
    id: number | null
  }

  export type PendaftaranMinAggregateOutputType = {
    id: number | null
    nama: string | null
    tempatLahir: string | null
    tanggalLahir: Date | null
    alamat: string | null
    jenjang: string | null
    createdAt: Date | null
  }

  export type PendaftaranMaxAggregateOutputType = {
    id: number | null
    nama: string | null
    tempatLahir: string | null
    tanggalLahir: Date | null
    alamat: string | null
    jenjang: string | null
    createdAt: Date | null
  }

  export type PendaftaranCountAggregateOutputType = {
    id: number
    nama: number
    tempatLahir: number
    tanggalLahir: number
    alamat: number
    jenjang: number
    createdAt: number
    _all: number
  }


  export type PendaftaranAvgAggregateInputType = {
    id?: true
  }

  export type PendaftaranSumAggregateInputType = {
    id?: true
  }

  export type PendaftaranMinAggregateInputType = {
    id?: true
    nama?: true
    tempatLahir?: true
    tanggalLahir?: true
    alamat?: true
    jenjang?: true
    createdAt?: true
  }

  export type PendaftaranMaxAggregateInputType = {
    id?: true
    nama?: true
    tempatLahir?: true
    tanggalLahir?: true
    alamat?: true
    jenjang?: true
    createdAt?: true
  }

  export type PendaftaranCountAggregateInputType = {
    id?: true
    nama?: true
    tempatLahir?: true
    tanggalLahir?: true
    alamat?: true
    jenjang?: true
    createdAt?: true
    _all?: true
  }

  export type PendaftaranAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pendaftaran to aggregate.
     */
    where?: PendaftaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pendaftarans to fetch.
     */
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendaftaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pendaftarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pendaftarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pendaftarans
    **/
    _count?: true | PendaftaranCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PendaftaranAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PendaftaranSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendaftaranMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendaftaranMaxAggregateInputType
  }

  export type GetPendaftaranAggregateType<T extends PendaftaranAggregateArgs> = {
        [P in keyof T & keyof AggregatePendaftaran]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendaftaran[P]>
      : GetScalarType<T[P], AggregatePendaftaran[P]>
  }




  export type PendaftaranGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendaftaranWhereInput
    orderBy?: PendaftaranOrderByWithAggregationInput | PendaftaranOrderByWithAggregationInput[]
    by: PendaftaranScalarFieldEnum[] | PendaftaranScalarFieldEnum
    having?: PendaftaranScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendaftaranCountAggregateInputType | true
    _avg?: PendaftaranAvgAggregateInputType
    _sum?: PendaftaranSumAggregateInputType
    _min?: PendaftaranMinAggregateInputType
    _max?: PendaftaranMaxAggregateInputType
  }

  export type PendaftaranGroupByOutputType = {
    id: number
    nama: string
    tempatLahir: string
    tanggalLahir: Date
    alamat: string
    jenjang: string
    createdAt: Date
    _count: PendaftaranCountAggregateOutputType | null
    _avg: PendaftaranAvgAggregateOutputType | null
    _sum: PendaftaranSumAggregateOutputType | null
    _min: PendaftaranMinAggregateOutputType | null
    _max: PendaftaranMaxAggregateOutputType | null
  }

  type GetPendaftaranGroupByPayload<T extends PendaftaranGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendaftaranGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendaftaranGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendaftaranGroupByOutputType[P]>
            : GetScalarType<T[P], PendaftaranGroupByOutputType[P]>
        }
      >
    >


  export type PendaftaranSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    tempatLahir?: boolean
    tanggalLahir?: boolean
    alamat?: boolean
    jenjang?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pendaftaran"]>

  export type PendaftaranSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    tempatLahir?: boolean
    tanggalLahir?: boolean
    alamat?: boolean
    jenjang?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pendaftaran"]>

  export type PendaftaranSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    tempatLahir?: boolean
    tanggalLahir?: boolean
    alamat?: boolean
    jenjang?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["pendaftaran"]>

  export type PendaftaranSelectScalar = {
    id?: boolean
    nama?: boolean
    tempatLahir?: boolean
    tanggalLahir?: boolean
    alamat?: boolean
    jenjang?: boolean
    createdAt?: boolean
  }

  export type PendaftaranOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "tempatLahir" | "tanggalLahir" | "alamat" | "jenjang" | "createdAt", ExtArgs["result"]["pendaftaran"]>

  export type $PendaftaranPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pendaftaran"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nama: string
      tempatLahir: string
      tanggalLahir: Date
      alamat: string
      jenjang: string
      createdAt: Date
    }, ExtArgs["result"]["pendaftaran"]>
    composites: {}
  }

  type PendaftaranGetPayload<S extends boolean | null | undefined | PendaftaranDefaultArgs> = $Result.GetResult<Prisma.$PendaftaranPayload, S>

  type PendaftaranCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PendaftaranFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PendaftaranCountAggregateInputType | true
    }

  export interface PendaftaranDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pendaftaran'], meta: { name: 'Pendaftaran' } }
    /**
     * Find zero or one Pendaftaran that matches the filter.
     * @param {PendaftaranFindUniqueArgs} args - Arguments to find a Pendaftaran
     * @example
     * // Get one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendaftaranFindUniqueArgs>(args: SelectSubset<T, PendaftaranFindUniqueArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pendaftaran that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendaftaranFindUniqueOrThrowArgs} args - Arguments to find a Pendaftaran
     * @example
     * // Get one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendaftaranFindUniqueOrThrowArgs>(args: SelectSubset<T, PendaftaranFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pendaftaran that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranFindFirstArgs} args - Arguments to find a Pendaftaran
     * @example
     * // Get one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendaftaranFindFirstArgs>(args?: SelectSubset<T, PendaftaranFindFirstArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pendaftaran that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranFindFirstOrThrowArgs} args - Arguments to find a Pendaftaran
     * @example
     * // Get one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendaftaranFindFirstOrThrowArgs>(args?: SelectSubset<T, PendaftaranFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pendaftarans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pendaftarans
     * const pendaftarans = await prisma.pendaftaran.findMany()
     * 
     * // Get first 10 Pendaftarans
     * const pendaftarans = await prisma.pendaftaran.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pendaftaranWithIdOnly = await prisma.pendaftaran.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PendaftaranFindManyArgs>(args?: SelectSubset<T, PendaftaranFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pendaftaran.
     * @param {PendaftaranCreateArgs} args - Arguments to create a Pendaftaran.
     * @example
     * // Create one Pendaftaran
     * const Pendaftaran = await prisma.pendaftaran.create({
     *   data: {
     *     // ... data to create a Pendaftaran
     *   }
     * })
     * 
     */
    create<T extends PendaftaranCreateArgs>(args: SelectSubset<T, PendaftaranCreateArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pendaftarans.
     * @param {PendaftaranCreateManyArgs} args - Arguments to create many Pendaftarans.
     * @example
     * // Create many Pendaftarans
     * const pendaftaran = await prisma.pendaftaran.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendaftaranCreateManyArgs>(args?: SelectSubset<T, PendaftaranCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pendaftarans and returns the data saved in the database.
     * @param {PendaftaranCreateManyAndReturnArgs} args - Arguments to create many Pendaftarans.
     * @example
     * // Create many Pendaftarans
     * const pendaftaran = await prisma.pendaftaran.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pendaftarans and only return the `id`
     * const pendaftaranWithIdOnly = await prisma.pendaftaran.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendaftaranCreateManyAndReturnArgs>(args?: SelectSubset<T, PendaftaranCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pendaftaran.
     * @param {PendaftaranDeleteArgs} args - Arguments to delete one Pendaftaran.
     * @example
     * // Delete one Pendaftaran
     * const Pendaftaran = await prisma.pendaftaran.delete({
     *   where: {
     *     // ... filter to delete one Pendaftaran
     *   }
     * })
     * 
     */
    delete<T extends PendaftaranDeleteArgs>(args: SelectSubset<T, PendaftaranDeleteArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pendaftaran.
     * @param {PendaftaranUpdateArgs} args - Arguments to update one Pendaftaran.
     * @example
     * // Update one Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendaftaranUpdateArgs>(args: SelectSubset<T, PendaftaranUpdateArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pendaftarans.
     * @param {PendaftaranDeleteManyArgs} args - Arguments to filter Pendaftarans to delete.
     * @example
     * // Delete a few Pendaftarans
     * const { count } = await prisma.pendaftaran.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendaftaranDeleteManyArgs>(args?: SelectSubset<T, PendaftaranDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pendaftarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pendaftarans
     * const pendaftaran = await prisma.pendaftaran.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendaftaranUpdateManyArgs>(args: SelectSubset<T, PendaftaranUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pendaftarans and returns the data updated in the database.
     * @param {PendaftaranUpdateManyAndReturnArgs} args - Arguments to update many Pendaftarans.
     * @example
     * // Update many Pendaftarans
     * const pendaftaran = await prisma.pendaftaran.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pendaftarans and only return the `id`
     * const pendaftaranWithIdOnly = await prisma.pendaftaran.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PendaftaranUpdateManyAndReturnArgs>(args: SelectSubset<T, PendaftaranUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pendaftaran.
     * @param {PendaftaranUpsertArgs} args - Arguments to update or create a Pendaftaran.
     * @example
     * // Update or create a Pendaftaran
     * const pendaftaran = await prisma.pendaftaran.upsert({
     *   create: {
     *     // ... data to create a Pendaftaran
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pendaftaran we want to update
     *   }
     * })
     */
    upsert<T extends PendaftaranUpsertArgs>(args: SelectSubset<T, PendaftaranUpsertArgs<ExtArgs>>): Prisma__PendaftaranClient<$Result.GetResult<Prisma.$PendaftaranPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pendaftarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranCountArgs} args - Arguments to filter Pendaftarans to count.
     * @example
     * // Count the number of Pendaftarans
     * const count = await prisma.pendaftaran.count({
     *   where: {
     *     // ... the filter for the Pendaftarans we want to count
     *   }
     * })
    **/
    count<T extends PendaftaranCountArgs>(
      args?: Subset<T, PendaftaranCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendaftaranCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pendaftaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PendaftaranAggregateArgs>(args: Subset<T, PendaftaranAggregateArgs>): Prisma.PrismaPromise<GetPendaftaranAggregateType<T>>

    /**
     * Group by Pendaftaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendaftaranGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PendaftaranGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendaftaranGroupByArgs['orderBy'] }
        : { orderBy?: PendaftaranGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PendaftaranGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendaftaranGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pendaftaran model
   */
  readonly fields: PendaftaranFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pendaftaran.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendaftaranClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pendaftaran model
   */
  interface PendaftaranFieldRefs {
    readonly id: FieldRef<"Pendaftaran", 'Int'>
    readonly nama: FieldRef<"Pendaftaran", 'String'>
    readonly tempatLahir: FieldRef<"Pendaftaran", 'String'>
    readonly tanggalLahir: FieldRef<"Pendaftaran", 'DateTime'>
    readonly alamat: FieldRef<"Pendaftaran", 'String'>
    readonly jenjang: FieldRef<"Pendaftaran", 'String'>
    readonly createdAt: FieldRef<"Pendaftaran", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pendaftaran findUnique
   */
  export type PendaftaranFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Filter, which Pendaftaran to fetch.
     */
    where: PendaftaranWhereUniqueInput
  }

  /**
   * Pendaftaran findUniqueOrThrow
   */
  export type PendaftaranFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Filter, which Pendaftaran to fetch.
     */
    where: PendaftaranWhereUniqueInput
  }

  /**
   * Pendaftaran findFirst
   */
  export type PendaftaranFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Filter, which Pendaftaran to fetch.
     */
    where?: PendaftaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pendaftarans to fetch.
     */
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pendaftarans.
     */
    cursor?: PendaftaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pendaftarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pendaftarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pendaftarans.
     */
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * Pendaftaran findFirstOrThrow
   */
  export type PendaftaranFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Filter, which Pendaftaran to fetch.
     */
    where?: PendaftaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pendaftarans to fetch.
     */
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pendaftarans.
     */
    cursor?: PendaftaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pendaftarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pendaftarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pendaftarans.
     */
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * Pendaftaran findMany
   */
  export type PendaftaranFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Filter, which Pendaftarans to fetch.
     */
    where?: PendaftaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pendaftarans to fetch.
     */
    orderBy?: PendaftaranOrderByWithRelationInput | PendaftaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pendaftarans.
     */
    cursor?: PendaftaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pendaftarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pendaftarans.
     */
    skip?: number
    distinct?: PendaftaranScalarFieldEnum | PendaftaranScalarFieldEnum[]
  }

  /**
   * Pendaftaran create
   */
  export type PendaftaranCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * The data needed to create a Pendaftaran.
     */
    data: XOR<PendaftaranCreateInput, PendaftaranUncheckedCreateInput>
  }

  /**
   * Pendaftaran createMany
   */
  export type PendaftaranCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pendaftarans.
     */
    data: PendaftaranCreateManyInput | PendaftaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pendaftaran createManyAndReturn
   */
  export type PendaftaranCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * The data used to create many Pendaftarans.
     */
    data: PendaftaranCreateManyInput | PendaftaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pendaftaran update
   */
  export type PendaftaranUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * The data needed to update a Pendaftaran.
     */
    data: XOR<PendaftaranUpdateInput, PendaftaranUncheckedUpdateInput>
    /**
     * Choose, which Pendaftaran to update.
     */
    where: PendaftaranWhereUniqueInput
  }

  /**
   * Pendaftaran updateMany
   */
  export type PendaftaranUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pendaftarans.
     */
    data: XOR<PendaftaranUpdateManyMutationInput, PendaftaranUncheckedUpdateManyInput>
    /**
     * Filter which Pendaftarans to update
     */
    where?: PendaftaranWhereInput
    /**
     * Limit how many Pendaftarans to update.
     */
    limit?: number
  }

  /**
   * Pendaftaran updateManyAndReturn
   */
  export type PendaftaranUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * The data used to update Pendaftarans.
     */
    data: XOR<PendaftaranUpdateManyMutationInput, PendaftaranUncheckedUpdateManyInput>
    /**
     * Filter which Pendaftarans to update
     */
    where?: PendaftaranWhereInput
    /**
     * Limit how many Pendaftarans to update.
     */
    limit?: number
  }

  /**
   * Pendaftaran upsert
   */
  export type PendaftaranUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * The filter to search for the Pendaftaran to update in case it exists.
     */
    where: PendaftaranWhereUniqueInput
    /**
     * In case the Pendaftaran found by the `where` argument doesn't exist, create a new Pendaftaran with this data.
     */
    create: XOR<PendaftaranCreateInput, PendaftaranUncheckedCreateInput>
    /**
     * In case the Pendaftaran was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendaftaranUpdateInput, PendaftaranUncheckedUpdateInput>
  }

  /**
   * Pendaftaran delete
   */
  export type PendaftaranDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
    /**
     * Filter which Pendaftaran to delete.
     */
    where: PendaftaranWhereUniqueInput
  }

  /**
   * Pendaftaran deleteMany
   */
  export type PendaftaranDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pendaftarans to delete
     */
    where?: PendaftaranWhereInput
    /**
     * Limit how many Pendaftarans to delete.
     */
    limit?: number
  }

  /**
   * Pendaftaran without action
   */
  export type PendaftaranDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pendaftaran
     */
    select?: PendaftaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pendaftaran
     */
    omit?: PendaftaranOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PendaftaranScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    tempatLahir: 'tempatLahir',
    tanggalLahir: 'tanggalLahir',
    alamat: 'alamat',
    jenjang: 'jenjang',
    createdAt: 'createdAt'
  };

  export type PendaftaranScalarFieldEnum = (typeof PendaftaranScalarFieldEnum)[keyof typeof PendaftaranScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PendaftaranWhereInput = {
    AND?: PendaftaranWhereInput | PendaftaranWhereInput[]
    OR?: PendaftaranWhereInput[]
    NOT?: PendaftaranWhereInput | PendaftaranWhereInput[]
    id?: IntFilter<"Pendaftaran"> | number
    nama?: StringFilter<"Pendaftaran"> | string
    tempatLahir?: StringFilter<"Pendaftaran"> | string
    tanggalLahir?: DateTimeFilter<"Pendaftaran"> | Date | string
    alamat?: StringFilter<"Pendaftaran"> | string
    jenjang?: StringFilter<"Pendaftaran"> | string
    createdAt?: DateTimeFilter<"Pendaftaran"> | Date | string
  }

  export type PendaftaranOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrder
    jenjang?: SortOrder
    createdAt?: SortOrder
  }

  export type PendaftaranWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PendaftaranWhereInput | PendaftaranWhereInput[]
    OR?: PendaftaranWhereInput[]
    NOT?: PendaftaranWhereInput | PendaftaranWhereInput[]
    nama?: StringFilter<"Pendaftaran"> | string
    tempatLahir?: StringFilter<"Pendaftaran"> | string
    tanggalLahir?: DateTimeFilter<"Pendaftaran"> | Date | string
    alamat?: StringFilter<"Pendaftaran"> | string
    jenjang?: StringFilter<"Pendaftaran"> | string
    createdAt?: DateTimeFilter<"Pendaftaran"> | Date | string
  }, "id">

  export type PendaftaranOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrder
    jenjang?: SortOrder
    createdAt?: SortOrder
    _count?: PendaftaranCountOrderByAggregateInput
    _avg?: PendaftaranAvgOrderByAggregateInput
    _max?: PendaftaranMaxOrderByAggregateInput
    _min?: PendaftaranMinOrderByAggregateInput
    _sum?: PendaftaranSumOrderByAggregateInput
  }

  export type PendaftaranScalarWhereWithAggregatesInput = {
    AND?: PendaftaranScalarWhereWithAggregatesInput | PendaftaranScalarWhereWithAggregatesInput[]
    OR?: PendaftaranScalarWhereWithAggregatesInput[]
    NOT?: PendaftaranScalarWhereWithAggregatesInput | PendaftaranScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pendaftaran"> | number
    nama?: StringWithAggregatesFilter<"Pendaftaran"> | string
    tempatLahir?: StringWithAggregatesFilter<"Pendaftaran"> | string
    tanggalLahir?: DateTimeWithAggregatesFilter<"Pendaftaran"> | Date | string
    alamat?: StringWithAggregatesFilter<"Pendaftaran"> | string
    jenjang?: StringWithAggregatesFilter<"Pendaftaran"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Pendaftaran"> | Date | string
  }

  export type PendaftaranCreateInput = {
    nama: string
    tempatLahir: string
    tanggalLahir: Date | string
    alamat: string
    jenjang: string
    createdAt?: Date | string
  }

  export type PendaftaranUncheckedCreateInput = {
    id?: number
    nama: string
    tempatLahir: string
    tanggalLahir: Date | string
    alamat: string
    jenjang: string
    createdAt?: Date | string
  }

  export type PendaftaranUpdateInput = {
    nama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenjang?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendaftaranUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenjang?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendaftaranCreateManyInput = {
    id?: number
    nama: string
    tempatLahir: string
    tanggalLahir: Date | string
    alamat: string
    jenjang: string
    createdAt?: Date | string
  }

  export type PendaftaranUpdateManyMutationInput = {
    nama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenjang?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendaftaranUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    alamat?: StringFieldUpdateOperationsInput | string
    jenjang?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PendaftaranCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrder
    jenjang?: SortOrder
    createdAt?: SortOrder
  }

  export type PendaftaranAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PendaftaranMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrder
    jenjang?: SortOrder
    createdAt?: SortOrder
  }

  export type PendaftaranMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    alamat?: SortOrder
    jenjang?: SortOrder
    createdAt?: SortOrder
  }

  export type PendaftaranSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}